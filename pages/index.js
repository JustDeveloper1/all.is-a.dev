/*

MIT License

Copyright (c) 2025 JustDeveloper <https://justdeveloper.is-a.dev/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const Home = () => {
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const translate = useTranslations();

  const err = {
    "noOwner1": "unknown",
    "noOwner2": "unknown",
  }

  const spotlight = [
    // to be spotlighted...
  ];
  const js_subdomains = [
    "juststudio.is-a.dev",
    "justdeveloper.is-a.dev",
    "encoder.js.is-a.dev",
    "all.is-a.dev"
  ];
  const js_partners = [
    "kappy.is-a.dev",
    "playreaver.is-a.dev",
  ];
  const maintainers = [
    "cutedog5695.is-a.dev",
    "iostpa.is-a.dev",
    "orangc.is-a.dev",
    "stefdp.is-a.dev",
    "william.is-a.dev",
    "21z.is-a.dev"
  ];

  const truncateString = (str, num) => {
    return str.length > num ? str.slice(0, num) : str;
  };

  const truncateString2 = (str, num) => {
    let output__ = truncateString(str, num - 3);
    if (str !== output__) {
      output__ += "...";
    }
    return output__;
  };
  
  const isOfficial = (domain) => {
    const offs = [
      '@.is-a.dev',
      'data.is-a.dev',
      'docs.is-a.dev',
      'owl.is-a.dev',
      'raw-api.is-a.dev',
      'register-bot.is-a.dev',
      'team.is-a.dev',
      'www.is-a.dev'
    ];
    return (offs.some(off => off === domain));
  };

  const isSys = (domain) => {
    const prefix = [
      '_',
      'zmail._domainkey'
    ];
    return (prefix.some(pfx => domain.startsWith(pfx)));
  };

  const toBeSpotlighted = (domain) => {
    return (spotlight.some(thing => thing === domain) || js_subdomains.some(subdomain => subdomain === domain) || js_partners.some(partner => partner === domain) || maintainers.some(one => one === domain));
  };

  useEffect(() => {    
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw-api.is-a.dev/');
        const data = await response.json();
        
        const processedItems = data.map((item, index) => {
          return {
            domain: item.domain,
            owner: `@${item.owner.username}` || err.noOwner1,
            description: item.description || item.domain,
            id: index
          };
        });

        setListItems(processedItems);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
        setTimeout(() => window.location.reload, 100);
      }
    };

    fetchData();
  }, []);

  const subdomain = (item, listId) => {
    const domain = item.domain;
    let description = item.description;
    const owner = item.owner.username || item.owner || err.noOwner2;
    const profile = owner.toLowerCase();
    const spotlight = toBeSpotlighted(domain);
    const id = item.id;
    description = encodeURIComponent(description)
      .replaceAll('%20', ' ')
      .replaceAll('%40', '@')
      .replace(/%\w\w/g, "");
    const link = `http://${domain}`;
    let title = description; 
    let tag1 = 'span';
    let ptag2 = 'div';
    let tag2p = `class="subdomain-link" id="subdomain-${id}" title="${description}" domain="${domain}"`;
    const isOff = isOfficial(domain);
    if (spotlight) {tag1 = 'span id="spotlight"'}
    if (isOff) {
      ptag2 = 'a';
      tag2p = `class="subdomain-link" target="_blank" title="${description}" href="${link}"`;
      if (domain === "@.is-a.dev") {
        title = `${translate.raw('root')} (is-a.dev)`
      }
    }
    if (domain === "all.is-a.dev") {
      ptag2 = 'a';
      tag2p = `class="subdomain-link" target="_self" title="${description}" href="${link}"`;
    }
    const tag2 = `${ptag2} ${tag2p}`;
    const sdinfotitle = `(${domain.replace('@.', '')}) #${id + 1}`;
    let sdinfodomain = domain === `@.is-a.dev` ? '' : `(${domain})`;
    let sdinfo = title !== domain ? `<div class="subdomain-info" id="info-${id}" title="${sdinfotitle}">${sdinfodomain}<small>#${id + 1}</small></div>` : `<div class="subdomain-info" id="info-${id}" title="${sdinfotitle}"><small>#${id + 1}</small></div>`;
    let output = `<${tag1}><${tag2}>${truncateString2(title, 50)}${sdinfo}</${ptag2}><info> by <a target="_blank" href="https://github.com/${profile.replace('@', '')}" title="${owner} on GitHub">${owner}</a></info></span>`;
    const isSystem = isSys(domain);
    if (listId == 1 && !isOff || listId == 3 && !isSystem || listId == 2 && (isOff || isSystem)) {
      output = '';
    }
    return output
  }

  const redirectWarning = (domain, aID, cID) => {
    return `
    <div class="WARNING">
      <h1>${translate.raw('warn')}</h1>
      <p><span>${translate.raw('ques')} "<strong style="padding: 0px !important;">${domain}</strong>"?</span><br>${translate.raw('info')} "<strong style="padding: 0px !important;">${domain}</strong>".<br>${translate.raw('inf0')}<br>${translate.raw('inf1')} "<strong style="padding: 0px !important;">${domain}</strong>" ${translate.raw('inf2')} <a href="https://github.com/is-a-dev/register/blob/main/TERMS_OF_SERVICE.md" target="_blank">${translate.raw('inf3')}</a>, ${translate.raw('inf4')} <a href="https://github.com/is-a-dev/register/issues/new?labels=report-abuse&amp;template=report-abuse.md&amp;title=Report+abuse" target="_blank">${translate.raw('inf5')}</a>.</p>
      <main><button id="${aID || `agree`}">${translate.raw('b1p1')} "${domain}"${translate.raw('b1p2')}</button><button id="${cID || `close`}">${translate.raw('b2p1')}</button></main>
    </div>
    `;
  };
  const handleClick = (target) => {
    const dmnID = `${target.id.replace('subdomain-', '')}`;
    const domain = target.getAttribute('domain');
    const link = `http://${domain}`;
    if (isOfficial(domain)) {
      window.open(link, "_blank");
    } else {
      document.body.innerHTML += redirectWarning(domain, `agree-${dmnID}`, `close-${dmnID}`);
      document.getElementById(`agree-${dmnID}`).addEventListener("click", () => {
        window.open(link, "_blank");
        window.location.reload();
      });
      document.getElementById(`close-${dmnID}`).addEventListener("click", () => {
        window.location.reload();
      });
    }
  }

  const clickEvent = (event) => {
    const target = event.target.closest('.subdomain-link');
    if (target && target.getAttribute('domain')) handleClick(target);
  }

  return (
    <>
      <div class="c">
        <a href="https://github.com/JustDeveloper1/all.is-a.dev" target="_blank" dangerouslySetInnerHTML={{__html: translate.raw('twos')}} />
        <a href="https://github.com/JustDeveloper1/all.is-a.dev/blob/main/LICENSE" target="_blank">&copy; 2025 JustDeveloper</a>
      </div>
      <div class="NOT-A DISCLAIMER THIS-IS-HEADER">
        <img alt="Domains Count" src="https://img.shields.io/github/directory-file-count/is-a-dev/register/domains?color=6e3bf3&amp;label=domains&amp;style=for-the-badge" width="106" height="31" />
        <h1>
          ------------
        </h1>
        <h1>
          all.is-a.dev
        </h1>
        <h1>
          ------------
        </h1>
        <p dangerouslySetInnerHTML={{
          __html:
            translate.raw('desc'),
        }} />
      </div>
      <div className="DISCLAIMER">
        <h1 dangerouslySetInnerHTML={{
          __html:
            translate.raw('disc'),
        }} />
        <p>{translate.raw('dis1')} <strong style={{ textDecoration: 'underline', padding: '0px !important' }}>{translate.raw('dis2')}</strong> {translate.raw('dis3')} <a href="https://raw-api.is-a.dev/" target="_blank">raw-api.is-a.dev</a>.</p>
      </div>
      <div dangerouslySetInnerHTML={{__html:translate.raw('data'),}} />
      {loading ? (
        <p dangerouslySetInnerHTML={{
          __html:
            translate.raw('load'),
        }} />
      ) : (
        <>
          <p>{translate.raw('offs')} <small>({translate.raw('offi')}<a href="https://docs.is-a.dev/" target="_blank" title="is-a.dev documentation">https://docs.is-a.dev/</a>)</small></p>
          <ul
            onClick={clickEvent}
          >
            {listItems.map(item => {
              const sbdItem = subdomain(item, 1);
              if (sbdItem !== '') return (
              <li key={item.id}
                dangerouslySetInnerHTML={{
                  __html:
                    sbdItem,
                }}
              >
              </li>
            )})}
          </ul>
          <p dangerouslySetInnerHTML={{
              __html:
                translate.raw('subd'),
            }} />
          <ul
            onClick={clickEvent}
          >
            {listItems.map(item => {
              const sbdItem = subdomain(item, 2);
              if (sbdItem !== '') return (
              <li key={item.id}
                dangerouslySetInnerHTML={{
                  __html:
                    sbdItem,
                }}
              >
              </li>
            )})}
          </ul>
          <p dangerouslySetInnerHTML={{
              __html:
                translate.raw('sysd'),
            }} />
          <ul
            onClick={clickEvent}
          >
            {listItems.map(item => {
              const sbdItem = subdomain(item, 3);
              if (sbdItem !== '') return (
              <li key={item.id}
                dangerouslySetInnerHTML={{
                  __html:
                    sbdItem,
                }}
              >
              </li>
            )})}
          </ul>
        </>
      )}
    </>
  );
};

export default Home;

export async function getStaticProps(context) {
  const messages = (await import('/locales/' + context.locale + '.json'))
    .default
  return {
    props: {
      messages,
      ...context,
    },
  }
}