import { motion } from 'framer-motion';
import { Icon } from '../ui/icon';

interface ChatEmptyStateProps {
  primaryColor: string;
  portalName: string;
}

export function ChatEmptyState({ primaryColor, portalName }: ChatEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: `${primaryColor}15` }}
      >
        <Icon icon="hugeicons:magic-wand-01" className="h-8 w-8" style={{ color: primaryColor }} />
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="text-lg font-semibold mb-2 text-foreground"
      >
        AI Assistant
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="text-sm text-muted-foreground max-w-sm"
      >
        Hi! I'm your AI assistant for {portalName}. I can help you find information from our help articles. Ask me anything!
      </motion.p>
    </motion.div>
  );
}
