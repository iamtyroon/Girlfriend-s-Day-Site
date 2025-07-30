"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
const OnboardingBear = ({ onStart, onComplete }: { onStart: () => void, onComplete: () => void }) => {
    const [step, setStep] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const steps = [
        {
            text: "Welcome, Praise! I'm your guide on this little adventure created by Tes.",
            button: "Let's Go!",
            action: () => {
                onStart();
                setStep(1);
            }
        },
        {
            text: "This is the 'Stage of Us'. It's all about songs that tell our story. Try clicking the arrow to see the next one!",
            highlight: "stage-of-us-carousel", // We will add this ID
        },
        {
            text: "Great! Now, click the 'Our Soundtrack' button to reveal a list of our special songs.",
            highlight: "soundtrack-button",
        },
        {
            text: "Perfect! Now, let's scroll down to see the 'Soft Side of You' section.",
            highlight: "soft-side",
        },
        {
            text: "This space is all about your adorable quirks. Now, let's find where you bloom...",
            highlight: "where-you-bloom",
        },
        {
            text: "And here's a special note. You can continue exploring on your own now. Enjoy the rest of the world Tes built for you!",
            button: "Finish",
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
        } else {
            setStep(s => s + 1);
        }
    }
    
    useEffect(() => {
        const handleInteraction = () => {
             // Only advance if there's no button to click
            if (!steps[step].button && steps[step+1]) {
                setStep(s => s + 1);
            }
        };

        if(step === 1) {
            document.querySelector('.next-button')?.addEventListener('click', handleInteraction);
        }
        if (step === 2) {
            document.getElementById('soundtrack-button')?.addEventListener('click', handleInteraction);
        }
        if (step === 3 || step === 4) {
             const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        handleInteraction();
                        observer.unobserve(entry.target);
                    }
                },
                { threshold: 0.5 }
            );
            const target = document.getElementById(steps[step].highlight!);
            if(target) observer.observe(target);

            return () => {
                if(target) observer.unobserve(target);
            }
        }

        return () => {
             if(step === 1) document.querySelector('.next-button')?.removeEventListener('click', handleInteraction);
             if (step === 2) document.getElementById('soundtrack-button')?.removeEventListener('click', handleInteraction);
        }

    }, [step]);


    return (
        <Dialog open={true}>
            <DialogContent className="bg-card border-primary text-foreground w-[80%] max-w-[500px]">
                <DialogHeader>
                    <div className="flex justify-center mb-4">
                        <Image src="/assets/icons/teddy-bear.png" alt="Guide Bear" width={100} height={100} data-ai-hint="teddy bear" />
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
        <div className="h-screen flex flex-col justify-center items-center text-center p-4">
            <Image src="/assets/gifs/bouquet.gif" alt="Pixel Bouquet" width={200} height={200} data-ai-hint="pixel bouquet" />
            <h1 className="text-3xl md:text-4xl mt-5 min-h-[4rem]">{titleText}</h1>
            <Button onClick={onStart} className="bg-primary text-primary-foreground border-2 border-foreground mt-5 animate-fade-in animation-delay-3000">START</Button>
        </div>
    );
};

export default function CanonEvent() {
    const [scene, setScene] = useState<'onboarding' | 'landing' | 'main'>('onboarding');

    const handleStartOnboarding = () => setScene('landing');
    const handleEnterMain = () => setScene('main');
    const handleCompleteOnboarding = () => {
        // Here you can decide what to do when onboarding is done.
        // For now, we'll just let the user explore freely.
    }


    if (scene === 'onboarding') {
        return <OnboardingBear onStart={handleStartOnboarding} onComplete={handleCompleteOnboarding} />;
    }

    if (scene === 'landing') {
        return <LandingScene onStart={handleEnterMain} />;
    }

    return <MainContent />;
}

// --- Main Content ---
const MainContent = () => {
    const [showSoundtrack, setShowSoundtrack] = useState(false);
    const [arcadeContent, setArcadeContent] = useState('');
    const letterRef = useRef<HTMLDivElement>(null);
    const [startLetter, setStartLetter] = useState(false);
    const letterText = useTypewriter("I feel like I’ve known you for ages. You were sent to me. Meeting you is probably a canon event. I don’t know if you’re from the future or just my favorite glitch in the simulation, but either way — I’m glad it’s you.", 100, startLetter);

    const carouselItems = [
        { title: "My Shot - Hamilton", quote: `"I am not throwing away my shot!"`, audio: '/assets/audio/hamilton-my-shot-lyrics-128-ytshorts.savetube.me.mp3' },
        { title: "Freefall - Rainbow Kitten Surprise", quote: `"You're the only one I see"`, audio: '/assets/audio/rainbow-kitten-surprise-it-s-called-freefall-official-video-128-ytshorts.savetube.me.mp3' },
        { title: "Love Like You - Steven Universe", quote: `"If I could begin to be, half of what you think of me..."`, audio: '/assets/audio/love-like-you-rebecca-sugar-lyrics-128-ytshorts.savetube.me.mp3' },
    ];
    
    const arcadeCartridges = [
      { title: "Our First Late Night Chat", content: "Our first late night chat..." },
      { title: "What We Binge", content: "Bones, Love, Death & Robots, Bojack, Your Name, Love & Other Drugs" },
      { title: "Canon Events", content: "Vivy, JoJo’s, Red String Theory, Killing Eve" },
    ];
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStartLetter(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );

        if (letterRef.current) {
            observer.observe(letterRef.current);
        }

        return () => {
            if (letterRef.current) {
                // observer.unobserve(letterRef.current);
            }
        };
    }, []);
    
    useEffect(() => {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;
        const handler = (e: KeyboardEvent) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    document.body.style.filter = 'hue-rotate(90deg)';
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, []);

    return (
        <div className="bg-background text-foreground min-h-screen">
            <nav className="sticky top-0 bg-card py-2 z-50 border-b border-border">
                <ul className="flex justify-center space-x-8">
                    <li><a href="#stage-of-us"><Image src="/assets/icons/music-notes.png" alt="Music" width={40} height={40} className="hover:scale-125 transition-transform" /></a></li>
                    <li><a href="#soft-side"><Image src="/assets/icons/teddy-bear.png" alt="Teddy Bear" width={40} height={40} className="hover:scale-125 transition-transform" /></a></li>
                    <li><a href="#where-you-bloom"><Image src="/assets/icons/flower.png" alt="Flower" width={40} height={40} className="hover:scale-125 transition-transform" /></a></li>
                    <li><a href="#letter"><Image src="/assets/icons/chat-bubble.png" alt="Letter" width={40} height={40} className="hover:scale-125 transition-transform" /></a></li>
                </ul>
            </nav>

            <main className="text-center">
                <section id="stage-of-us" className="py-12 px-4 border-b-2 border-secondary">
                    <h2 className="text-2xl text-accent mb-6">The Stage of Us</h2>
                    <Image src="/assets/images/hamilton.png" alt="Hamilton Sprite" width={150} height={150} className="mx-auto mb-6" data-ai-hint="pixel art" />
                    <Carousel id="stage-of-us-carousel" className="w-full max-w-lg mx-auto" >
                        <CarouselContent>
                            {carouselItems.map((item, index) => (
                                <CarouselItem key={index}>
                                     <Card className="bg-card border-primary text-foreground">
                                        <CardContent className="flex flex-col items-center justify-center p-6 aspect-square">
                                            <h3 className="font-bold text-lg">{item.title}</h3>
                                            <p className="mt-2 text-sm">{item.quote}</p>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                         <CarouselPrevious className="prev-button" />
                         <CarouselNext className="next-button"/>
                    </Carousel>
                    <Button id="soundtrack-button" onClick={() => setShowSoundtrack(!showSoundtrack)} className="bg-accent text-accent-foreground mt-6">Our Soundtrack</Button>
                    {showSoundtrack && (
                        <Card className="mt-4 p-4 bg-card rounded-lg max-w-md mx-auto">
                           <ul>
                                {carouselItems.map((item) => (
                                    <li key={item.title}>
                                        <a href={item.audio} target="_blank" rel="noopener noreferrer" className="hover:underline">{item.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}
                </section>

                <section id="soft-side" className="py-12 px-4 border-b-2 border-secondary">
                    <h2 className="text-2xl text-accent mb-6">The Soft Side of You</h2>
                    <div className="flex justify-around items-center flex-wrap">
                        {[
                            { quote: "She said 3 biscuits, not 2, Tes!" },
                            { quote: "This AI would totally recommend Smocha naps." },
                            { quote: "Villanelle's got nothing on you, Agent Praise." }
                        ].map((item, index) => (
                            <div key={index} className="relative m-4 group animate-float">
                                <Image src="/assets/icons/teddy-bear.png" alt={`Teddy Bear ${index + 1}`} width={150} height={150} data-ai-hint="teddy bear" />
                                <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 bg-white text-black p-2 rounded-lg text-xs w-40 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.quote}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="where-you-bloom" className="py-12 px-4 border-b-2 border-secondary">
                    <h2 className="text-2xl text-accent mb-6">Where You Bloom</h2>
                    <div className="flex justify-around flex-wrap">
                        {[
                            "Your bravery in sharing your stories is one of the most beautiful things about you.",
                            "You have the best taste in shows. 'Bones', 'Love, Death & Robots', 'BoJack'... all amazing.",
                            "Your quirks are my favorite things. The 'AI from the future' and 'golden retriever energy'... never change."
                        ].map((tip, index) => (
                            <div key={index} className="relative m-4 group">
                                <Image src="/assets/icons/flower.png" alt={`Flower ${index + 1}`} width={150} height={150} className="animate-bloom-flower" data-ai-hint="flower" />
                                <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[50px] h-[50px] bg-no-repeat bg-cover transition-transform group-hover:scale-125 group-hover:rotate-12 cursor-pointer" style={{backgroundImage: "url('/assets/icons/butterfly.png')"}} data-ai-hint="butterfly"></div>
                                <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 bg-white text-black p-2 rounded-lg text-xs w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    {tip}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="letter" ref={letterRef} className="py-12 px-4 border-b-2 border-secondary">
                    <h2 className="text-2xl text-accent mb-6">A Note I Never Sent (But Should Have Every Day)</h2>
                     <Card className="bg-card border-primary p-5 w-full max-w-2xl mx-auto min-h-[200px]">
                        <p className="text-left whitespace-pre-wrap text-lg leading-relaxed">{letterText}</p>
                    </Card>
                    <Button className="bg-accent text-accent-foreground mt-6">I'd still choose you.</Button>
                </section>

                <section id="memory-arcade" className="py-12 px-4 border-b-2 border-secondary">
                    <h2 className="text-2xl text-accent mb-6">Interactive Memory Arcade</h2>
                    <div className="flex justify-center gap-5 mb-5 flex-wrap">
                        {arcadeCartridges.map(cart => (
                            <Button key={cart.title} onClick={() => setArcadeContent(cart.content)} className="bg-secondary border-2 border-primary p-5 h-auto hover:bg-accent">
                               {cart.title}
                            </Button>
                        ))}
                    </div>
                     <Card className="bg-card border-primary p-5 min-h-[100px] w-full max-w-2xl mx-auto">
                        {arcadeContent}
                    </Card>
                </section>

                <section id="gallery-wall" className="py-12 px-4">
                    <h2 className="text-2xl text-accent mb-6">The Faces of My Favourite Villanelle</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                        {[
                          { caption: "Possessed? Nah. Just enchanting.", image: "/assets/images/pot.jpeg"},
                          { caption: "Golden Retriever approved ✔", image: "/assets/images/pot.jpeg" },
                          { caption: "This AI is in love.", image: "/assets/images/pot.jpeg" }
                        ].map((photo, index) => (
                           <Card key={index} className="relative border-4 border-primary overflow-hidden">
                               <Image src={photo.image} alt={`Praise ${index + 1}`} width={300} height={400} className="pixelated w-full h-full object-cover" data-ai-hint="woman portrait" />
                               <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
                                   <p>{photo.caption}</p>
                               </div>
                           </Card>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

    