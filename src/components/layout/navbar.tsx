'use client';

import styles from '@/styles/components/Navbar.module.css';
import { Button } from "@/components/ui/button"
import { Menu, Mail, Pen, Vault, Music, Check } from 'lucide-react';
import { useTool } from '@/context/ToolContext';
export const Navbar: React.FC = () => {
    const { setTool } = useTool();
    return (
        <div>
            <main className={`${styles.navigation_bar}`}>
                <div className='px-4 space-x-4'>
                    <Button variant="default" className={`font-montserrat font-bold`} onClick={() => setTool("notepad")}><Pen /> Notepad</Button>
                    <Button variant="default" className={`font-montserrat font-bold`} onClick={() => setTool("vault")}><Vault /> Vault</Button>
                    <Button variant="default" className={`font-montserrat font-bold`} onClick={() => setTool("music")}><Music /> Music Visualizer</Button>
                    <Button variant="default" className={`font-montserrat font-bold`} onClick={() => setTool("tasks")}><Check /> Tasks</Button>
                </div>
                <div>
                    <Button variant="default" className={`font-montserrat font-semibold`}><Mail />Login</Button>
                    <Button variant="default"><Menu /></Button>
                </div>
            </main>
        </div>
    );
};
