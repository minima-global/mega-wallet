const FOOTER_NAV = [
  {
    title: "Minima",
    target: "_blank",
    links: [
      // {
      //   title: "About us",
      //   href: "https://www.minima.global/about",
      // },
      // {
      //   title: "Build",
      //   href: "https://build.minima.global/",
      // },
      // {
      //   title: "Grants",
      //   href: "https://build.minima.global/grants",
      // },
      // {
      //   title: "Tokens",
      //   href: "https://docs.minima.global/docs/about/tokendistribution",
      // },
      // {
      //   title: "Ecosystem",
      //   href: "https://docs.minima.global/docs/about/tokendistribution#ecosystem-growth",
      // },
      {
        title: "Documentation",
        href: "https://docs.minima.global/docs/about/welcome",
      },
      // {
      //   title: "Whitepaper",
      //   href: "https://docs.minima.global/docs/learn/minimawhitepaper/introduction",
      // },
      // {
      //   title: "Terms & conditions",
      //   href: "https://docs.minima.global/docs/terms/minimatermsandconditions",
      // },
      // {
      //   title: "Privacy Policy",
      //   href: "https://docs.minima.global/docs/terms/minimaprivacypolicy/",
      // },
    ],
  },
  // {
  //   title: "Social",
  //   target: "_blank",
  //   links: [
  //     {
  //       title: "Discord",
  //       href: "https://discord.com/invite/minimaglobal",
  //     },
  //     {
  //       title: "Telegram",
  //       href: "https://t.me/Minima_Global",
  //     },
  //     {
  //       title: "Twitter / X",
  //       href: "https://x.com/Minima_Global",
  //     },
  //     {
  //       title: "YouTube",
  //       href: "https://www.youtube.com/@MinimaGlobal",
  //     },
  //     {
  //       title: "CoinMarketCap",
  //       href: "https://coinmarketcap.com/currencies/wrapped-minima",
  //     },
  //   ],
  // },
];

const Footer: React.FC = () => (
  <footer className="w-full p-5 text-white lg:py-20">
    <div className="container mx-auto w-full">
      <div className="grid grid-cols-12">
        <div className="relative col-span-12 lg:col-span-6 min-h[140px]">
          <h4 className="mb-2 mt-1 text-3xl font-normal tracking-wide leading-10 lg:-mt-3 lg:mb-5 lg:text-[40px]">
            Minima Public Wallet
          </h4>
          <p className="mb-4 max-w-[440px] text-xs leading-5 tracking-wide text-grey20 lg:text-sm">
            The Minima Public wallet enables you to send, receive, and store
            Minima, custom tokens, and NFTs without running a Minima node.
          </p>
          <p className="text-xs text-grey40">Minima GmbH &copy;2024.</p>
        </div>
        <div className="col-span-12 flex justify-end text-xs lg:col-span-6 lg:text-sm">
          <div className="grid w-full grid-cols-12 lg:max-w-[576px]">
            <div className="hidden lg:block lg:col-span-4" />
            {FOOTER_NAV.map(({ title, links, target }) => (
              <div
                key={title}
                className="col-span-6 mt-10 lg:col-span-4 lg:mt-0"
              >
                <h5 className="mb-4 font-semibold text-lightOrange">{title}</h5>
                <ul className="flex flex-col gap-2.5 lg:gap-3.5">
                  {links.map(({ title, href }) => (
                    <li key={title}>
                      <a
                        target={target}
                        href={href}
                        className="text-grey40 hover:text-white"
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 mb-8 flex items-end justify-end gap-5 lg:hidden">
        <h5 className="-mb-1 flex flex-auto text-xs text-grey40">
          Powered by{" "}
        </h5>
        <svg
          width="178"
          height="33"
          viewBox="0 0 178 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[120px] lg:w-[180px]"
        >
          <path
            d="M28.8727 9.20984L27.2806 16.252L25.2445 7.75549L18.1105 4.86209L16.1816 13.3739L14.4823 3.39243L7.34831 0.514343L0 33H7.79227L10.0427 23.0185L11.742 33H19.5496L21.4632 24.4882L23.4993 33H31.2915L36.022 12.0879L28.8727 9.20984Z"
            fill="#E9E9EB"
          />
          <path
            d="M82.5469 15.5016C82.5469 14.9267 82.0808 14.4606 81.5059 14.4606C80.9309 14.4606 80.4648 14.9267 80.4648 15.5016V31.9588C80.4648 32.5337 80.9309 32.9998 81.5059 32.9998C82.0808 32.9998 82.5469 32.5337 82.5469 31.9588V15.5016Z"
            fill="#E9E9EB"
          />
          <path
            d="M121.829 15.5016C121.829 14.9267 121.363 14.4606 120.788 14.4606C120.213 14.4606 119.747 14.9267 119.747 15.5016V31.9588C119.747 32.5337 120.213 32.9998 120.788 32.9998C121.363 32.9998 121.829 32.5337 121.829 31.9588V15.5016Z"
            fill="#E9E9EB"
          />
          <path
            d="M60.9762 24.9014L54.3474 14.9505C54.1484 14.6443 53.8116 14.4606 53.4442 14.4606H53.1992C52.6328 14.4606 52.1582 14.9352 52.1582 15.5016V31.9588C52.1582 32.5252 52.6328 32.9998 53.1992 32.9998C53.7656 32.9998 54.2402 32.5252 54.2402 31.9588V18.1807L60.1342 26.8303C60.3944 27.213 60.6853 27.3508 60.9762 27.3508C61.267 27.3508 61.5579 27.2283 61.8182 26.8303L67.7121 18.1807V31.9588C67.7121 32.5252 68.1867 32.9998 68.7531 32.9998C69.3196 32.9998 69.7941 32.5252 69.7941 31.9588V15.5016C69.7941 14.9352 69.3196 14.4606 68.7531 14.4606H68.5082C68.1408 14.4606 67.804 14.6443 67.605 14.9505L60.9762 24.9014Z"
            fill="#E9E9EB"
          />
          <path
            d="M141.318 24.9014L134.689 14.9505C134.49 14.6443 134.153 14.4606 133.786 14.4606H133.541C132.975 14.4606 132.5 14.9352 132.5 15.5016V31.9588C132.5 32.5252 132.975 32.9998 133.541 32.9998C134.107 32.9998 134.582 32.5252 134.582 31.9588V18.1807L140.476 26.8303C140.736 27.213 141.027 27.3508 141.318 27.3508C141.609 27.3508 141.9 27.2283 142.16 26.8303L148.054 18.1807V31.9588C148.054 32.5252 148.528 32.9998 149.095 32.9998C149.661 32.9998 150.136 32.5252 150.136 31.9588V15.5016C150.136 14.9352 149.661 14.4606 149.095 14.4606H148.85C148.483 14.4606 148.146 14.6443 147.947 14.9505L141.318 24.9014Z"
            fill="#E9E9EB"
          />
          <path
            d="M106.995 29.6012L95.4522 14.874C95.2532 14.6137 94.9317 14.4606 94.5949 14.4606H94.2734C93.707 14.4606 93.2324 14.9352 93.2324 15.5016V31.9588C93.2324 32.5252 93.707 32.9998 94.2734 32.9998C94.8399 32.9998 95.3144 32.5252 95.3144 31.9588V17.8592L106.704 32.3874L106.857 32.5865C107.056 32.8467 107.378 32.9998 107.715 32.9998H108.036C108.603 32.9998 109.077 32.5252 109.077 31.9588V15.5016C109.077 14.9352 108.603 14.4606 108.036 14.4606C107.47 14.4606 106.995 14.9352 106.995 15.5016V29.6012Z"
            fill="#E9E9EB"
          />
          <path
            d="M176.988 31.6067C176.988 31.6067 169.701 15.67 169.502 15.2567C169.303 14.8434 168.874 14.4606 168.185 14.4606C167.496 14.4606 167.068 14.828 166.869 15.2567C166.67 15.6854 159.382 31.6067 159.382 31.6067C159.153 32.0966 159.382 32.6783 159.872 32.9079C160.362 33.1376 160.944 32.9079 161.174 32.4181L163.118 28.0856H173.283L175.227 32.4181C175.457 32.9079 176.039 33.1223 176.529 32.9079C177.018 32.6783 177.233 32.0966 177.018 31.6067H176.988ZM168.185 26.172H163.96L168.185 16.7723L172.41 26.172H168.185Z"
            fill="#E9E9EB"
          />
        </svg>
      </div>
    </div>
  </footer>
);

export default Footer;
