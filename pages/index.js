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

import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
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

    const redirectWarning = (domain, aID, cID) => {
      return `
      <div class="WARNING">
        <h1>WAIT!</h1>
        <p><span>Are you sure you want to go to "<strong style="padding: 0px !important;">${domain}</strong>"?</span><br>We are not responsible for any content on "<strong style="padding: 0px !important;">${domain}</strong>".<br>They may collect your personal data, such as your IP address.<br>If you believe that "<strong style="padding: 0px !important;">${domain}</strong>" is violating <a href="https://github.com/is-a-dev/register/blob/main/TERMS_OF_SERVICE.md" target="_blank">is-a.dev's Terms Of Service</a>, you can <a href="https://github.com/is-a-dev/register/issues/new?labels=report-abuse&amp;template=report-abuse.md&amp;title=Report+abuse" target="_blank">report it here</a>.</p>
        <main><button id="${aID || `agree`}">Yes, I want to go to "${domain}" anyway.</button><button id="${cID || `close`}">No, I want to stay here.</button></main>
      </div>
      `;
    };

    const throwNewError = (error) => {
      console.error(error);
      //window.location.reload();
      throw new Error(error);
    };

    const processChunks = async (data) => {
      const chunkSize = Math.max(75, Math.floor(data.length / (window.navigator.hardwareConcurrency || 1)));
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        chunk.forEach(item => {
          // do nothing (lmao)
        });
      }
      await new Promise(resolve => setTimeout(resolve, 100));
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

    try {
      fetch('https://raw-api.is-a.dev/')
        .then(response => response.json())
        .then(async data => {
          const list1 = document.getElementById('list');
          const list2 = document.getElementById('list-sys');
          const list3 = document.getElementById('main');
          let dmnID = 0;

          list1.innerHTML = ``;
          list2.innerHTML = ``;
          list3.innerHTML = ``;

          const listItems = JSON.parse(`{${data.map((item, index) => {
            return `"${index}":"${item.domain}",`;
          }).join('').slice(0, -1)}}`);

          await processChunks(data);

          const listItemsHTML = data.map((item, index) => {
            dmnID++;
            const domain = `${item.domain}`;
            const name = `${item.owner.username}`;
            const namelink = name.toLowerCase();
            let desc = `${item.description || domain}`;
            let sdinfo = desc !== domain ? `<div class="subdomain-info" id="info-${dmnID}">(${domain}) <small>#${dmnID}</small></div>` : `<div class="subdomain-info" id="info-${dmnID}"><small>#${dmnID}</small></div>`;
            desc = encodeURIComponent(desc).replaceAll('%20', ' ').replaceAll('%40', '@').replace(/%\w\w/g, "");
            const link = `http://${domain}`;
            let listItemHTML = `<span><div class="subdomain-link" id="subdomain-${dmnID}" title="${desc}">${truncateString2(desc, 50)}</div>${sdinfo}<info> by <a target="_blank" href="https://github.com/${namelink}" title="@${name} on GitHub">${name}</a></info></span>`;

            if (toBeSpotlighted(domain)) {
              listItemHTML = `<span id="spotlight"><div class="subdomain-link" id="subdomain-${dmnID}" title="${desc}">${desc}</div>${sdinfo}<info> by <a target="_blank" href="https://github.com/${namelink}" title="@${name} on GitHub">${name}</a></info></span>`;
            }

            if (isOfficial(domain)) {
              if (domain === "@.is-a.dev") {
                listItemHTML = `<span><a class="subdomain-link" target="_blank" title="${desc}" href="${link}">The root domain (is-a.dev)</a>${sdinfo}<info> by <a target="_blank" href="https://github.com/${namelink}" title="@${name} on GitHub">${name}</a></info></span>`;
                return { html: listItemHTML, appendTo: list3 };
              }
              return { html: listItemHTML, appendTo: list3 };
            } else if (isSys(domain)) {
              return { html: listItemHTML, appendTo: list2 };
            } else {
              return { html: listItemHTML, appendTo: list1 };
            }
          });console.log(listItemsHTML);

          for (const item of listItemsHTML) {
            try {
              item.appendTo.innerHTML += item.html;
            } catch (error) {
              console.error(`Unable to visualize subdomain: ${error}`);
            }
          }

          const handleClick = (target) => {
            const dmnID = `${target.id.replace('subdomain-', '')}`;
            const domain = listItems[dmnID];
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

          const addEventListeners = (list) => {
            list.addEventListener('click', (event) => {
              const target = event.target.closest('.subdomain-link');
              if (target) handleClick(target);
            });
          };

          addEventListeners(list1);
          addEventListeners(list2);
          addEventListeners(list3);
        })
        .catch(error => throwNewError(`Error fetching data: ${error}`));
    } catch (error) {
      alert(`Uh Oh! ${error}. Please try again later.`);
    }
  }, []);

  return (
    <div>
        <div className="NOT-A DISCLAIMER THIS-IS-HEADER">
            <img alt="Domains Count" src="https://img.shields.io/github/directory-file-count/is-a-dev/register/domains?color=6e3bf3&amp;label=domains&amp;style=for-the-badge" width="106" height="31" />
            <h1>
                js.is-a.dev
            </h1>
            <h1>
                all.is-a.dev
            </h1>
            <h1>
                jd.is-a.dev
            </h1>
            <p>
                Every website on .is-a.dev
            </p>
        </div>
        <div className="DISCLAIMER">
            <h1>DISCLAIMER</h1>
            <p>This website is <strong style={{ textDecoration: 'underline', padding: '0px !important' }}>NOT</strong> claiming to be an official website/subdomain of is-a.dev. This is just a visualized version of <a href="https://raw-api.is-a.dev/" target="_blank">raw-api.is-a.dev</a>.</p>
        </div>
        <p>Official Subdomains <small>(Check <a href="https://docs.is-a.dev/" target="_blank" title="is-a.dev documentation">https://docs.is-a.dev/</a>)</small></p>
        <ul id="main">
            <li>
                <span>Loading...</span>
            </li>
        </ul>
        <p>Subdomains</p>
        <ul id="list">
            <li>
                <span>Loading...</span>
            </li>
        </ul>
        <p>Subdomains that are most likely made for verifications</p>
        <ul id="list-sys">
            <li>
                <span>Loading...</span>
            </li>
        </ul>
    </div>
  );
};

export default Home;
