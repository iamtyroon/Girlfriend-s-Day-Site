"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Dock = ({ navItems }: { navItems: Array<{ href: string; title: string; icon: React.ElementType }> }) => (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <TooltipProvider>
            <div className="flex items-center justify-center gap-2 bg-card/80 backdrop-blur-md border border-primary rounded-full p-2">
                {navItems.map((item) => (
                    <Tooltip key={item.href}>
                        <TooltipTrigger asChild>
                            <Link href={item.href} passHref>
                                <Button variant="ghost" size="icon" className="rounded-full text-foreground hover:bg-accent hover:text-accent-foreground">
                                    <item.icon className="h-5 w-5" />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{item.title}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </TooltipProvider>
    </nav>
);
