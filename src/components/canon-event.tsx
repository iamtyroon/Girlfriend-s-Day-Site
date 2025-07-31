"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LightRays from './ui/LightRays';

// --- Typewriter Hook ---
const useTypewriter = (text: string, speed = 100, start = false) => {
    const [displayText, setDisplayText] = useState('');
    
    useEffect(() => {
        setDisplayText(''); // Reset on text change
        if (start) {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    setDisplayText(prev => prev + text.charAt(i));
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, speed);
            return () => clearInterval(typing);
        }
    }, [text, speed, start]);

    return displayText;
};

// --- Onboarding Bear Component ---
const OnboardingBear = ({ onComplete }: { onComplete: () => void }) => {
    const [step, setStep] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();

    const steps = [
        {
            text: "Welcome, Praise! I'm your guide on this little adventure created by Tes.",
            button: "Let's Go!",
            action: () => setStep(1)
        },
        {
            text: "This is the 'Stage of Us'. It's all about songs that tell our story. I'll take you there now.",
            button: "Continue",
            action: () => {
                 onComplete();
            }
        },
    ];

    const currentStep = steps[step];
    const typedText = useTypewriter(currentStep.text, 50, isActive);
    
    useEffect(() => {
       const timer = setTimeout(() => setIsActive(true), 500);
       return () => clearTimeout(timer);
    }, []);

    const handleNextStep = () => {
        if(currentStep.action) {
            currentStep.action();
        }
    }

    return (
        <Dialog open={true}>
            <DialogContent className="bg-card border-primary text-foreground w-[80%] max-w-[500px]">
                <DialogHeader>
                    <div className="flex justify-center mb-4">
                        <Image src="/assets/icons/teddy-bear.png" alt="Guide Bear" width={150} height={150} data-ai-hint="teddy bear" />
                    </div>
                    <DialogTitle className="text-center min-h-[100px]">{typedText}</DialogTitle>
                </DialogHeader>
                {currentStep.button && (
                    <DialogFooter>
                        <Button onClick={handleNextStep} className="bg-accent text-accent-foreground border-2 border-foreground hover:bg-primary">{currentStep.button}</Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};

// --- Landing Scene Component ---
const LandingScene = ({ onStart }: { onStart: () => void }) => {
    const [startTyping, setStartTyping] = useState(false);
    const titleText = useTypewriter("Happy Girlfriend’s Day, Praise 😊❤️", 150, startTyping);

    useEffect(() => {
        const timer = setTimeout(() => setStartTyping(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-screen flex flex-col justify-center items-center text-center p-4 relative">
            <LightRays
                raysOrigin="top-center"
                raysColor="#00ffff"
                raysSpeed={1.5}
                lightSpread={0.8}
                rayLength={1.2}
                followMouse={true}
                mouseInfluence={0.1}
                noiseAmount={0.1}
                distortion={0.05}
                className="custom-rays"
              />
            <Image src="/assets/gifs/bouquet.gif" alt="Pixel Bouquet" width={300} height={300} data-ai-hint="pixel bouquet" />
            <h1 className="text-3xl md:text-4xl mt-5 min-h-[4rem]">{titleText}</h1>
            <Button onClick={onStart} className="bg-primary text-primary-foreground border-2 border-foreground mt-5 animate-fade-in animation-delay-3000">START</Button>
        </div>
    );
};

export default function CanonEvent({ onEnterMain }: { onEnterMain: () => void}) {
    const [scene, setScene] = useState<'onboarding' | 'landing'>('onboarding');

    const handleStartOnboarding = () => setScene('landing');
    const handleEnterMain = () => {
        onEnterMain();
    }
   
    if (scene === 'onboarding') {
        return <OnboardingBear onComplete={handleStartOnboarding} />;
    }

    if (scene === 'landing') {
        return <LandingScene onStart={handleEnterMain} />;
    }

    return null;
}
