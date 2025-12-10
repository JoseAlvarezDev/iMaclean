import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, X } from 'lucide-react';
import './WindowFrame.css';

interface WindowFrameProps {
    children: ReactNode;
}

export function WindowFrame({ children }: WindowFrameProps) {
    return (
        <motion.div
            className="window-frame"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="window-titlebar">
                <div className="traffic-lights">
                    <button className="traffic-light red" aria-label="Cerrar">
                        <X size={8} strokeWidth={3} />
                    </button>
                    <button className="traffic-light yellow" aria-label="Minimizar">
                        <Minus size={8} strokeWidth={3} />
                    </button>
                    <button className="traffic-light green" aria-label="Maximizar">
                        <Square size={6} strokeWidth={3} />
                    </button>
                </div>
                <div className="window-title">
                    <span className="window-title-text">iMaclean</span>
                </div>
                <div className="window-titlebar-spacer" />
            </div>
            <div className="window-content">{children}</div>
        </motion.div>
    );
}
