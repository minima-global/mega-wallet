import { useEffect, useState } from "react";

type SplashProps = {
    display: boolean;
    dismiss: () => void;
}

const Splash = ({ display, dismiss }: SplashProps) => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    useEffect(() => { 
        if (display) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [display]);

    const handleNext = () => {
        if (step === 3) {
            return dismiss();
        }

        setStep(step + 1);
    }

    const goToStep = (index: number) => {
        setStep(index + 1);
    }

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-black z-[100] flex items-center justify-center ${display ? 'opacity-100' : 'opacity-0 pointer-events-none transition-opacity duration-[200ms]'}`}>
            <div className="space-y-8 lg:space-y-10 w-full max-w-[540px] px-10 text-center">
                <div className="text-[22px] md:text-[30px] leading-[32px] md:leading-[44px] text-center">
                    <div className={`transition-opacity duration-500 ${step === 1 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                        <h3 className="text-black dark:text-white font-bold md:text-[30px]">
                            Welcome to<span className="block lg:hidden"/> Minima's Web Wallet
                        </h3>
                    </div>
                    <div className={`transition-opacity duration-500 ${step === 2 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                        <h3 className="text-black dark:text-white font-bold">
                            Web wallet is a non-custodial Minima wallet for holding, sending and receiving Minima, custom tokens or NFTs without running a Minima node
                        </h3>
                    </div>
                    <div className={`transition-opacity duration-500 ${step === 3 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                        <h3 className="text-black dark:text-white font-bold">
                            Generate a new secret key to get started or login with your existing web wallet secret key
                        </h3>
                    </div>
                </div>
                <div className="relative flex justify-center gap-2" role="navigation" aria-label="Progress steps">
                    {[...new Array(totalSteps)].map((_, index) => (
                        <button key={index} onClick={() => goToStep(index)} className={`!p-0 h-2 w-2 rounded-full duration-300 hover:bg-black/80dark:hover:bg-white/80 bg-black/30 dark:bg-white/30 ${step - 1 > index ? "cursor-pointer" : "cursor-default"} ${index === step - 1 ? 'bg-black dark:bg-white' : 'bg-contrast3'}`} aria-label={`Go to step ${index + 1}`} aria-current={index === step - 1 ? 'step' : undefined} />
                    ))}
                </div>
                <div>
                    <button type="button" onClick={handleNext} className="h-[44px] text-sm max-w-[240px] mb-7 mx-auto rounded-none flex justify-center focus:outline-none items-center w-full text-black bg-lightOrange hover:bg-lighterOrange">
                        {step === 3 ? "Go to web wallet" : "Next"}
                    </button>
                    <div className={`text-sm mx-auto cursor-pointer ${step === 3 ? 'opacity-0' : 'opacity-100'}`} onClick={dismiss}>
                        Go to web wallet
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Splash;
