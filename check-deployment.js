#!/usr/bin/env node

/**
 * Deployment Status Checker
 * Checks the current status of help center deployment and domains
 */

const domains = [
  'genie-622v.cloud-cr.usegately.com',
  '01-test-t57s.usegately.com',
  '0per8r-sqlq.usegately.com',
  'accept-member.usegately.com'
];

async function checkDomain(domain) {
  try {
    console.log(`\n🔍 Checking ${domain}...`);
    
    const response = await fetch(`https://${domain}`, {
      method: 'HEAD',
      timeout: 10000
    });
    
    console.log(`   Status: ${response.status}`);
    console.log(`   Headers: ${JSON.stringify(Object.fromEntries(response.headers), null, 2)}`);
    
    return response.status;
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return null;
  }
}

async function checkAPI() {
  console.log('\n🔍 Checking API endpoint...');
  
  try {
    const response = await fetch('https://api.usegately.com/api/public/help-center/resolve-domain?domain=genie-622v.cloud-cr.usegately.com');
    const data = await response.json();
    
    console.log(`   Status: ${response.status}`);
    console.log(`   Response: ${JSON.stringify(data, null, 2)}`);
  } catch (error) {
    console.log(`   ❌ API Error: ${error.message}`);
  }
}

async function main() {
  console.log('🚀 Help Center Deployment Status Check\n');
  
  // Check API first
  await checkAPI();
  
  // Check each domain
  for (const domain of domains) {
    await checkDomain(domain);
  }
  
  console.log('\n📋 Recommendations:');
  console.log('1. If domains return 500 errors, redeploy with: npm run deploy');
  console.log('2. If API returns 404, check backend domain resolution endpoint');
  console.log('3. If worker fails, deploy with: wrangler deploy worker-router.js');
}

main().catch(console.error);