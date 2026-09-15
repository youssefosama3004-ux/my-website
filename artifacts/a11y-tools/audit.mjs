import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({channel:'msedge', headless:true});
const routes=['/','/quick-info','/work','/work/koolen','/work/horizon-app','/work/project2','/work/project3','/work/project4','/blog','/blog/coming-soon'];
const results=[];
const interactions=[];
await Promise.all(['light','dark'].flatMap(theme => ['desktop','mobile'].map(async device => {
  const context=await browser.newContext({viewport:device==='desktop'?{width:1440,height:1000}:{width:390,height:844},colorScheme:theme});
  const page=await context.newPage();
  for(const route of routes){
    try {
      const response=await page.goto('http://localhost:4321'+route,{waitUntil:'networkidle',timeout:30000}).catch(async()=>null);
      await page.waitForTimeout(700);
      // Reveal lazy content and scroll-triggered text before auditing.
      for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=700){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(40);}
      await page.evaluate(()=>window.scrollTo(0,0));
      const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
      const compact=items=>items.map(v=>({id:v.id,impact:v.impact,description:v.description,help:v.help,url:v.helpUrl,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary,checks:n.any.map(a=>({id:a.id,data:a.data,message:a.message}))}))}));
      results.push({route,theme,device,status:response?.status(),violations:compact(scan.violations),incomplete:compact(scan.incomplete),passes:scan.passes.length});
      console.log(JSON.stringify({route,theme,device,violations:scan.violations.map(v=>[v.id,v.nodes.length])}));
      if(route==='/'){
        await page.getByRole('button',{name:'Toggle menu',exact:true}).click();
        await page.waitForTimeout(700);
        const menuScan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze();
        const focus=[];
        for(let i=0;i<14;i++){await page.keyboard.press('Tab');focus.push(await page.evaluate(()=>({text:document.activeElement?.textContent?.trim().slice(0,80),tag:document.activeElement?.tagName,href:document.activeElement?.getAttribute('href'),inMenu:!!document.activeElement?.closest('.staggered-menu-panel')})));}
        await page.keyboard.press('Escape');
        const expanded=await page.getByRole('button',{name:'Toggle menu',exact:true}).getAttribute('aria-expanded');
        interactions.push({theme,device,menuViolations:compact(menuScan.violations),focus,expandedAfterEscape:expanded});
        await page.screenshot({path:`artifacts/a11y-tools/menu-${theme}-${device}.png`});
      }
    }catch(e){results.push({route,theme,device,error:String(e)});console.log('ERROR',route,theme,device,String(e));}
  }
  await context.close();
})));
await writeFile('artifacts/a11y-tools/results.json',JSON.stringify({date:new Date().toISOString(),results,interactions},null,2));
await browser.close();
