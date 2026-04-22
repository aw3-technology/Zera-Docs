import { useState, useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

interface BaseLayoutWrapperProps {
  children: ReactNode;
  config: any;
  projectId: string;
  aiChatOpen: boolean;
  onAiChatToggle: () => void;
}

export function BaseLayoutWrapper({
  children,
  config,
  projectId,
  aiChatOpen,
  onAiChatToggle,
}: BaseLayoutWrapperProps) {
  const { isDark } = useTheme();
  const [AIChatPanel, setAIChatPanel] = useState<any>(null);

  // Dynamically import AIChatPanel only on client side
  useEffect(() => {
    import('./help-center/AIChatPanel').then(module => {
      setAIChatPanel(() => module.AIChatPanel);
    });
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* AI Chat Panel - Full-screen overlay on mobile, side panel on desktop */}
      {AIChatPanel && aiChatOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <AIChatPanel
            isOpen={aiChatOpen}
            onClose={onAiChatToggle}
            projectId={projectId}
            primaryColor={config.primary_color}
            isDark={isDark}
            portalName={config.portal_name}
            subdomainUrl={config.subdomain_url}
          />
        </div>
      )}

      {/* AI Chat Panel - Animated side panel on desktop */}
      <motion.div
        initial={false}
        animate={{
          width: AIChatPanel && aiChatOpen ? 384 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.3
        }}
        className="hidden md:block flex-shrink-0 overflow-hidden h-screen"
      >
        {AIChatPanel && aiChatOpen && (
          <AIChatPanel
            isOpen={aiChatOpen}
            onClose={onAiChatToggle}
            projectId={projectId}
            primaryColor={config.primary_color}
            isDark={isDark}
            portalName={config.portal_name}
            subdomainUrl={config.subdomain_url}
          />
        )}
      </motion.div>
    </div>
  );
}
