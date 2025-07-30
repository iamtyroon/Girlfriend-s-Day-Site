"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { Music, Heart, Flower, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Typewriter Hook ---
const useTypewriter = (text: string, speed = 100, start = false) => {
    const [displayText, setDisplayText] = useState('');
    
    useEffect(() => {
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

// --- Guide Popup Component ---
const GuidePopup = ({ onStart }: { onStart: () => void }) => {
    const [step, setStep] = useState(0);
    const messages = [
        "Welcome, Praise! I'm your guide on this little adventure.",
        "Tes has created this world just for you, filled with memories and love.",
        "Click the 'START' button to begin. I'll be here if you need me!"
    ];

    const handleNext = () => setStep(s => s + 1);

    if (step >= messages.length) {
        return null;
    }

    return (
        <Dialog open={true}>
            <DialogContent className="bg-card border-primary text-foreground w-[80%] max-w-[500px]">
                <DialogHeader>
                    <div className="flex justify-center mb-4">
                        <Image src="https://placehold.co/100x100.png" alt="Guide Bear" width={100} height={100} data-ai-hint="teddy bear" />
                    </div>
                    <DialogTitle className="text-center">{messages[step]}</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    {step < messages.length - 1 ? (
                        <Button onClick={handleNext} className="bg-accent text-accent-foreground border-2 border-foreground hover:bg-primary">Next</Button>
                    ) : (
                        <Button onClick={onStart} className="bg-accent text-accent-foreground border-2 border-foreground hover:bg-primary">Close</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// --- Landing Scene Component ---
const LandingScene = ({ onStart }: { onStart: () => void }) => {
    const [startTyping, setStartTyping] = useState(false);
    const titleText = useTypewriter("Happy Girlfriend’s Day, Praise ❤️", 150, startTyping);

    useEffect(() => {
        const timer = setTimeout(() => setStartTyping(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-screen flex flex-col justify-center items-center text-center p-4">
            <Image src="https://placehold.co/200x200.png" alt="Pixel Bouquet" width={200} height={200} data-ai-hint="pixel bouquet" />
            <h1 className="text-3xl md:text-4xl mt-5 min-h-[4rem]">{titleText}</h1>
            <Button onClick={onStart} className="bg-primary text-primary-foreground border-2 border-foreground mt-5 animate-fade-in animation-delay-3000">START</Button>
        </div>
    );
};

export default function CanonEvent() {
    const [scene, setScene] = useState<'guide' | 'landing' | 'main'>('guide');

    const handleStart = () => setScene('landing');
    const handleEnterMain = () => setScene('main');

    if (scene === 'guide') {
        return <GuidePopup onStart={handleStart} />;
    }

    if (scene === 'landing') {
        return <LandingScene onStart={handleEnterMain} />;
    }

    return <MainContent />;
}

// --- Main Content ---
const MainContent = () => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [showSoundtrack, setShowSoundtrack] = useState(false);
    const [arcadeContent, setArcadeContent] = useState('');
    const letterRef = useRef<HTMLDivElement>(null);
    const [startLetter, setStartLetter] = useState(false);
    const letterText = useTypewriter("I feel like I’ve known you for ages. You were sent to me. Meeting you is probably a canon event. I don’t know if you’re from the future or just my favorite glitch in the simulation, but either way — I’m glad it’s you.", 100, startLetter);

    const carouselItems = [
        { title: "My Shot - Hamilton", quote: `"I am not throwing away my shot!"` },
        { title: "Freefall - Rainbow Kitten Surprise", quote: `"You're the only one I see"` },
        { title: "Love Like You - Steven Universe", quote: `"If I could begin to be, half of what you think of me..."` },
    ];
    
    const arcadeCartridges = [
      { title: "Our First Late Night Chat", content: "Our first late night chat..." },
      { title: "What We Binge", content: "Bones, Love, Death & Robots, Bojack, Your Name, Love & Other Drugs" },
      { title: "Canon Events", content: "Vivy, JoJo’s, Red String Theory, Killing Eve" },
    ];

    const handleCarousel = (direction: 'next' | 'prev') => {
        const totalItems = carouselItems.length;
        if (direction === 'next') {
            setCarouselIndex((prev) => (prev + 1) % totalItems);
        } else {
            setCarouselIndex((prev) => (prev - 1 + totalItems) % totalItems);
        }
    };
    
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
                observer.unobserve(letterRef.current);
            }
        };
    }, []);

    return (
        <div className="bg-background text-foreground min-h-screen">
            <nav className="sticky top-0 bg-card py-2 z-50 border-b border-border">
                <ul className="flex justify-center space-x-8">
                    <li><a href="#stage-of-us"><Music className="hover:scale-125 transition-transform" /></a></li>
                    <li><a href="#soft-side"><Heart className="hover:scale-125 transition-transform" /></a></li>
                    <li><a href="#where-you-bloom"><Flower className="hover:scale-125 transition-transform" /></a></li>
                    <li><a href="#letter"><MessageSquare className="hover:scale-125 transition-transform" /></a></li>
                </ul>
            </nav>

            <main className="text-center">
                <section id="stage-of-us" className="py-12 px-4 border-b-2 border-secondary">
                    <h2 className="text-2xl text-accent mb-6">The Stage of Us</h2>
                    <Image src="https://placehold.co/150x150.png" alt="Hamilton Sprite" width={150} height={150} className="mx-auto mb-6" data-ai-hint="pixel art" />
                    <div className="relative w-full max-w-lg mx-auto overflow-hidden">
                        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
                            {carouselItems.map((item, index) => (
                                <div key={index} className="flex-shrink-0 w-full p-5 bg-card border-2 border-primary">
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p className="mt-2 text-sm">{item.quote}</p>
                                </div>
                            ))}
                        </div>
                        <Button onClick={() => handleCarousel('prev')} className="absolute top-1/2 -translate-y-1/2 left-0 bg-primary rounded-full p-2 h-10 w-10"><ChevronLeft /></Button>
                        <Button onClick={() => handleCarousel('next')} className="absolute top-1/2 -translate-y-1/2 right-0 bg-primary rounded-full p-2 h-10 w-10"><ChevronRight /></Button>
                    </div>
                    <Button onClick={() => setShowSoundtrack(!showSoundtrack)} className="bg-accent text-accent-foreground mt-6">Our Soundtrack</Button>
                    {showSoundtrack && (
                        <div className="mt-4 p-4 bg-card rounded-lg max-w-md mx-auto">
                            <p>Our first late night chat - 'I feel like I’ve known you for ages.'</p>
                            <p>Sharing our favorite shows - 'You get me.'</p>
                            <p>The 'canon event' joke - 'No coincidences. Just you. Just us.'</p>
                        </div>
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
                                <Image src="https://placehold.co/150x150.png" alt={`Teddy Bear ${index + 1}`} width={150} height={150} data-ai-hint="teddy bear" />
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
                                <Image src="https://placehold.co/150x150.png" alt={`Flower ${index + 1}`} width={150} height={150} className="animate-bloom-flower" data-ai-hint="flower" />
                                <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[50px] h-[50px] bg-no-repeat bg-cover transition-transform group-hover:scale-125 group-hover:rotate-12 cursor-pointer" style={{backgroundImage: "url('https://placehold.co/50x50.png')"}} data-ai-hint="butterfly"></div>
                                <div className="absolute bottom-[160px] left-1/2 -translate-x-1/2 bg-white text-black p-2 rounded-lg text-xs w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                    {tip}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="letter" ref={letterRef} className="py-12 px-4 border-b-2 border-secondary">
                    <h2 className="text-2xl text-accent mb-6">A Note I Never Sent (But Should Have Every Day)</h2>
                    <div className="bg-card border-2 border-primary p-5 w-full max-w-2xl mx-auto min-h-[200px]">
                        <p className="text-left whitespace-pre-wrap text-lg leading-relaxed">{letterText}</p>
                    </div>
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
                    <div className="bg-card border-2 border-primary p-5 min-h-[100px] w-full max-w-2xl mx-auto">
                        {arcadeContent}
                    </div>
                </section>

                <section id="gallery-wall" className="py-12 px-4">
                    <h2 className="text-2xl text-accent mb-6">The Faces of My Favourite Villanelle</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
                        {[
                          { caption: "Possessed? Nah. Just enchanting." },
                          { caption: "Golden Retriever approved ✔" },
                          { caption: "This AI is in love." }
                        ].map((photo, index) => (
                           <div key={index} className="relative border-4 border-primary">
                               <Image src="https://placehold.co/300x400.png" alt={`Praise ${index + 1}`} width={300} height={400} className="pixelated w-full" data-ai-hint="woman portrait" />
                               <div className="absolute bottom-2 left-2 right-2 bg-black/70 text-white p-2 text-sm">
                                   <p>{photo.caption}</p>
                               </div>
                           </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};
