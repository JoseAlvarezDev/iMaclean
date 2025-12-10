import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import './Modal.css';

export function WelcomeModal() {
    const { activeModal, setActiveModal } = useStore();

    const isOpen = activeModal === 'welcome';

    const handleClose = () => {
        setActiveModal(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="modal-content"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={handleClose}>
                            <X size={18} />
                        </button>

                        <div className="modal-icon">
                            <img
                                src="/icons/logo_light.png"
                                alt="iMaclean Logo"
                                className="modal-logo"
                            />
                        </div>

                        <h2 className="modal-title">Bienvenido a iMaclean</h2>

                        <p className="modal-text">
                            Tu asistente de limpieza inteligente y seguro para Mac.
                            Recupera espacio en disco de forma visual y controlada.
                        </p>

                        <div className="modal-features">
                            <div className="modal-feature">
                                <div className="feature-icon feature-icon--blue">
                                    <Shield size={18} />
                                </div>
                                <div className="feature-content">
                                    <span className="feature-title">100% Seguro</span>
                                    <span className="feature-text">
                                        Nunca accedemos a tus archivos. Tú controlas todo.
                                    </span>
                                </div>
                            </div>

                            <div className="modal-feature">
                                <div className="feature-icon feature-icon--green">
                                    <Sparkles size={18} />
                                </div>
                                <div className="feature-content">
                                    <span className="feature-title">Transparente</span>
                                    <span className="feature-text">
                                        Comandos visibles que copias y ejecutas tú mismo.
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-warning">
                            <strong>⚠️ Importante:</strong> Revisa siempre los comandos antes
                            de ejecutarlos en tu Terminal. La responsabilidad final es tuya.
                        </div>

                        <motion.button
                            className="modal-button"
                            onClick={handleClose}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Comenzar
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
