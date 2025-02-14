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

  const subdomain = (item) => {
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
    let tag2p = `class="subdomain-link" id="subdomain-${id}" title="${description}"`
    if (spotlight) {tag1 = 'span id="spotlight"'}
    if (isOfficial(domain)) {
      ptag2 = 'a';
      tag2p = `class="subdomain-link" target="_blank" title="${description}" href="${link}"`;
      if (domain === "@.is-a.dev") {
        title = "The root domain (is-a.dev)"
      }
    }
    const tag2 = `${ptag2} ${tag2p}`;
    let sdinfo = title !== domain ? `<div class="subdomain-info" id="info-${id}">(${domain}) <small>#${id}</small></div>` : `<div class="subdomain-info" id="info-${id}"><small>#${id}</small></div>`;
    let output = `<${tag1}><${tag2}>${title}${sdinfo}</${ptag2}><info> by <a target="_blank" href="https://github.com/${profile.replace('@', '')}" title="${owner} on GitHub">${owner}</a></info></span>`;
    return output
  }

  return (
    <div>
      <h1>Subdomains</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {listItems.map(item => (
            <li key={item.id}
              dangerouslySetInnerHTML={{
                __html:
                  subdomain(item),
              }}
            >
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
