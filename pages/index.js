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

const Home = () => {
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
        alert(`Uh Oh! ${error}. Please try again later.`);
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
        title = "The root domain (is-a.dev)"
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
      <h1>WAIT!</h1>
      <p><span>Are you sure you want to go to "<strong style="padding: 0px !important;">${domain}</strong>"?</span><br>We are not responsible for any content on "<strong style="padding: 0px !important;">${domain}</strong>".<br>They may collect your personal data, such as your IP address.<br>If you believe that "<strong style="padding: 0px !important;">${domain}</strong>" is violating <a href="https://github.com/is-a-dev/register/blob/main/TERMS_OF_SERVICE.md" target="_blank">is-a.dev's Terms Of Service</a>, you can <a href="https://github.com/is-a-dev/register/issues/new?labels=report-abuse&amp;template=report-abuse.md&amp;title=Report+abuse" target="_blank">report it here</a>.</p>
      <main><button id="${aID || `agree`}">Yes, I want to go to "${domain}" anyway.</button><button id="${cID || `close`}">No, I want to stay here.</button></main>
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
        <a href="https://github.com/JustDeveloper1/all.is-a.dev" target="_blank">This website is open-source.</a>
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
        <p>
          Every website on .is-a.dev
        </p>
      </div>
      <div className="DISCLAIMER">
        <h1>DISCLAIMER</h1>
        <p>This website is <strong style={{ textDecoration: 'underline', padding: '0px !important' }}>NOT</strong> claiming to be an official website/subdomain of is-a.dev. This is just a visualized version of <a href="https://raw-api.is-a.dev/" target="_blank">raw-api.is-a.dev</a>.</p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>Official Subdomains <small>(Check <a href="https://docs.is-a.dev/" target="_blank" title="is-a.dev documentation">https://docs.is-a.dev/</a>)</small></p>
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
          <p>Subdomains</p>
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
          <p>Subdomains that are most likely made for verifications</p>
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