import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'msedge',headless:true});
const results=[];
for(const theme of ['light','dark']){
 const context=await browser.newContext({viewport:{width:1440,height:1000},colorScheme:theme});
 const page=await context.newPage();
 for(const route of ['/','/work/koolen','/work/horizon-app']){
  await page.goto('http://localhost:4321'+route,{waitUntil:'domcontentloaded'});await page.waitForTimeout(1300);
  const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze();
  results.push({route,theme,device:'desktop',violations:scan.violations,incomplete:scan.incomplete});
  console.log(theme,route,scan.violations.map(v=>[v.id,v.nodes.length]));
  if(route==='/'){
   await page.locator('.clients-section').scrollIntoViewIfNeeded();
   console.log('CLIENTS',await page.locator('.clients-section').evaluate(el=>({background:getComputedStyle(el).backgroundColor,pill:getComputedStyle(el.querySelector('h2')).backgroundColor})));
   await page.locator('#contact').scrollIntoViewIfNeeded();await page.waitForTimeout(600);
   const contactScan=await new AxeBuilder({page}).include('#contact').analyze();results.push({route,theme,device:'desktop',state:'contact-visible',violations:contactScan.violations,incomplete:contactScan.incomplete});
   await page.getByRole('button',{name:'Toggle menu',exact:true}).click();await page.waitForTimeout(600);
   let focus=[];for(let i=0;i<14;i++){await page.keyboard.press('Tab');focus.push(await page.evaluate(()=>({name:document.activeElement.textContent.trim().slice(0,50),href:document.activeElement.getAttribute('href'),inMenu:!!document.activeElement.closest('.staggered-menu-panel')})));}
   await page.keyboard.press('Escape');results.push({theme,state:'keyboard-menu',focus,expanded:await page.getByRole('button',{name:'Toggle menu'}).getAttribute('aria-expanded')});
  }
 }
 await context.close();
}
for(const theme of ['light','dark']){
 const page=await browser.newPage({viewport:{width:390,height:844},colorScheme:theme});
 await page.goto('http://localhost:4321/work/koolen',{waitUntil:'domcontentloaded'});await page.waitForTimeout(1000);
 const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze();results.push({route:'/work/koolen',theme,device:'mobile',violations:scan.violations,incomplete:scan.incomplete});
 console.log(theme,'mobile koolen',scan.violations.map(v=>v.id));await page.close();
}
await writeFile('artifacts/a11y-tools/followup.json',JSON.stringify(results,null,2));await browser.close();
