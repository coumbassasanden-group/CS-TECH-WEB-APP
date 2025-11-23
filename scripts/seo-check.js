// scripts/seo-check.js
const puppeteer = require('puppeteer');

async function checkSEO() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('https://tech.coumbassa-sanden.com/fr');
    
    // Vérifier le titre
    const title = await page.title();
    console.log('✓ Titre:', title);
    
    // Vérifier la meta description
    const description = await page.$eval('meta[name="description"]', el => el.content);
    console.log('✓ Description:', description);
    
    // Vérifier les H1
    const h1 = await page.$eval('h1', el => el.textContent);
    console.log('✓ H1:', h1);
    
    // Vérifier le sitemap
    const sitemapResponse = await page.goto('https://tech.coumbassa-sanden.com/sitemap.xml');
    console.log('✓ Sitemap status:', sitemapResponse.status());
    
    // Vérifier robots.txt
    const robotsResponse = await page.goto('https://tech.coumbassa-sanden.com/robots.txt');
    console.log('✓ Robots.txt status:', robotsResponse.status());
    
  } catch (error) {
    console.error('✗ Erreur SEO:', error);
  } finally {
    await browser.close();
  }
}

checkSEO();