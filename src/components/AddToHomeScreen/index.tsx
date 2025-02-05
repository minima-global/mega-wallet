import { useEffect, useState } from "react";

const AddToHomeScreen = () => {
    return null;

    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        // const enabled = /iPad|iPhone|iPod/.test(navigator.userAgent) && !localStorage.getItem('dismiss-add-to-home-screen');
        setEnabled(true);
    }, []);

    const handleClick = () => {
        localStorage.setItem('dismiss-add-to-home-screen', '1');
        setEnabled(false);
    }

    return (
        <div>
            <div className={`z-[1001] fixed bottom-0 left-0 w-full ${enabled ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div onClick={handleClick} className={`relative z-10 bg-contrast1 rounded-t-lg p-3.5 select-none transform-y-[100px] border-t border-[#111] border-opacity-10 dark:border-opacity-30 cursor-pointer translate-y-[100%] transition-all duration-300 ${enabled ? 'translate-y-[0]' : 'translate-y-[100%]'}`}>
                    <div className="grid grid-cols-12 mx-auto">
                        <div className="text-black dark:text-white col-span-10 flex items-center gap-6">
                            <div>
                                <img src="./icon.svg" className="w-12 h-12 mx-2 inline-block rounded-xl overflow-hidden" />
                            </div>
                            <div className="text-[12px]">
                                Tap the share button
                                <svg width="517px" height="596px" className="w-4 h-4 mx-1 inline-block" viewBox="0 0 517 596" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Group-2">
                                            <rect id="Rectangle" x="0" y="0" width="517" height="596"></rect>
                                            <g id="Group" transform="translate(48.000000, 0.000000)" fill="currentColor" fill-rule="nonzero">
                                                <path d="M398.177419,190.701675 C410.676425,190.701675 420.927198,200.334576 421.921029,212.586511 L422,214.54177 L422,408.668259 C422,450.923605 388.566476,485.364392 346.72821,486.943436 L343.725806,487 L78.2741935,487 C36.0498904,487 1.63440586,453.541895 0.0565218632,411.67287 L0,408.668259 L0,214.54177 C0,201.37525 10.6657327,190.701675 23.8225807,190.701675 C36.3215863,190.701675 46.5723597,200.334576 47.5661901,212.586511 L47.6451612,214.54177 L47.6451612,408.668259 C47.6451612,424.891294 60.2392966,438.170647 76.1771421,439.249096 L78.2741935,439.31981 L343.725806,439.31981 C359.936923,439.31981 373.206521,426.716415 374.284177,410.766852 L374.354838,408.668259 L374.354838,214.54177 C374.354838,201.37525 385.020571,190.701675 398.177419,190.701675 Z M204.178676,0.224475748 L206.205253,0.0214683462 L206.205253,0.0214683462 L208.583781,0 L208.583781,0 L210.687004,0.177221954 L210.687004,0.177221954 L213.108771,0.616731 L213.108771,0.616731 L214.047902,0.865356219 L214.047902,0.865356219 C216.706811,1.59989761 219.261919,2.81170859 221.582347,4.49369908 L223.209278,5.78818097 L223.209278,5.78818097 L224.474392,6.96351605 L330.35793,112.9249 C339.661226,122.235036 339.661226,137.329749 330.35793,146.639887 C321.601886,155.402367 307.725552,155.917807 298.367121,148.186207 L296.667714,146.639887 L231.419354,81.3369413 L231.419354,343.959429 C231.419354,356.467624 221.793531,366.725934 209.550596,367.720495 L207.596774,367.799525 C195.097769,367.799525 184.846995,358.166623 183.853165,345.914688 L183.774193,343.959429 L183.774193,81.391433 L118.590853,146.639887 C109.83481,155.402367 95.9584768,155.917807 86.6000463,148.186207 L84.9006373,146.639887 C76.1445936,137.877405 75.6295331,123.99087 83.3554533,114.625558 L84.9006373,112.9249 L190.428235,7.29348217 C191.188859,6.50238663 192.003563,5.76373833 192.866391,5.08349364 L194.409086,3.98322216 L194.409086,3.98322216 C194.922479,3.62150076 195.459686,3.29295101 196.010339,2.98562889 L196.266217,2.86060094 C198.676912,1.53693197 201.347384,0.631583516 204.178676,0.224475748 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                and then select the <strong>Add to Home Screen</strong> option.
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center justify-end pr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`bg-black fixed w-screen h-screen top-0 left-0 z-[1000] transition-opacity duration-300 ${enabled ? 'pointer-events-auto opacity-70' : 'pointer-events-none opacity-0'}`} />
        </div>
    );
};

export default AddToHomeScreen;
