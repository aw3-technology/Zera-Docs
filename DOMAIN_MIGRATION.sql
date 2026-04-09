-- Migration: Add help center custom domain tracking
-- This allows mapping custom domains to specific projects

-- Create table for custom domain mappings
CREATE TABLE IF NOT EXISTS help_center_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id VARCHAR(255) NOT NULL,
  domain VARCHAR(255) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  ssl_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  -- Foreign key to projects table
  CONSTRAINT fk_project
    FOREIGN KEY (project_id)
    REFERENCES projects(id)
    ON DELETE CASCADE
);

-- Indexes for fast lookups
CREATE INDEX idx_help_center_domains_domain ON help_center_domains(domain);
CREATE INDEX idx_help_center_domains_project ON help_center_domains(project_id);
CREATE INDEX idx_help_center_domains_active ON help_center_domains(is_active) WHERE is_active = true;

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_help_center_domains_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_help_center_domains_updated_at
  BEFORE UPDATE ON help_center_domains
  FOR EACH ROW
  EXECUTE FUNCTION update_help_center_domains_updated_at();

-- Migrate existing custom domains from your current setup
-- You'll need to populate this based on your existing data
-- Example:
-- INSERT INTO help_center_domains (project_id, domain) VALUES
--   ('project-123', '01-test-t57s.usegately.com'),
--   ('project-456', '0per8r-sqlq.usegately.com'),
--   ('project-789', 'accept-member.usegately.com');

-- Add column to projects table to track if help center is enabled
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS help_center_enabled BOOLEAN DEFAULT false;

-- Add column to store subdomain
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS help_center_subdomain VARCHAR(255) UNIQUE;

-- Create index on subdomain
CREATE INDEX IF NOT EXISTS idx_projects_help_center_subdomain 
ON projects(help_center_subdomain) 
WHERE help_center_subdomain IS NOT NULL;

COMMENT ON TABLE help_center_domains IS 'Maps custom domains to help center projects';
COMMENT ON COLUMN help_center_domains.domain IS 'The custom domain (e.g., help.example.com)';
COMMENT ON COLUMN help_center_domains.project_id IS 'The project this domain belongs to';
COMMENT ON COLUMN help_center_domains.is_active IS 'Whether this domain is currently active';
COMMENT ON COLUMN help_center_domains.ssl_enabled IS 'Whether SSL is enabled for this domain';
