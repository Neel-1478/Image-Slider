import { useState, useEffect, useRef } from 'react';
import './index.css';

const images = [
    { url: 'image/parrot2.jpg', name: 'PARROT', description: 'Parrots are vibrant birds known for mimicking sounds.' },
    { url: 'image/eagel3.jpg', name: 'EAGLE', description: 'Eagles symbolize strength and dominance.' },
    { url: 'image/butterfly2.jpg', name: 'BUTTERFLY', description: 'Butterflies represent change and beauty.' },
    { url: 'image/owl1.jpg', name: 'OWL', description: 'Owls are wise nocturnal hunters.' },
    { url: 'image/kingfirser2.jpeg', name: 'KINGFISHER', description: 'Kingfishers are skilled at catching fish.' },
    { url: 'image/crow.jpg', name: 'CROW', description: 'Crows are highly intelligent and resourceful birds.' },
    { url: 'image/heron.jpeg', name: 'HERON', description: 'Herons wade through water to catch fish.' },
    { url: 'image/eagel1.jpg', name: 'EAGLE', description: 'Eagles soar high with great vision.' },
    { url: 'image/butterfly1.jpeg', name: 'BUTTERFLY', description: 'Butterflies have delicate wings and vivid colors.' },
    { url: 'image/owl2.jpg', name: 'OWL', description: 'Owls have a sharp sense of hearing.' },
];

const ImageSlider = () => {
    const [currentImages, setCurrentImages] = useState(images);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const [activeMode, setActiveMode] = useState('auto'); // Tracks current mode: Auto or Manual
    const progressRef = useRef(null);
    const autoSlideTimer = useRef(null);

    const slideInterval = 4000; // Duration for auto-slide

    useEffect(() => {
        if (autoPlay) {
            initiateAutoSlide();
        }
        resetProgressAnimation();
        return () => clearTimeout(autoSlideTimer.current);
    }, [autoPlay]);

    const initiateAutoSlide = () => {
        if (autoPlay) {
            autoSlideTimer.current = setTimeout(() => {
                handleSlide('next');
            }, slideInterval);
        }
    };

    const resetProgressAnimation = () => {
        if (progressRef.current) {
            progressRef.current.style.animation = 'none';
            progressRef.current.offsetHeight; // Trigger reflow
            progressRef.current.style.animation = `progressBar ${slideInterval / 1000}s linear 1 forwards`;
        }
    };

    const handleSlide = (direction) => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        if (direction === 'next') {
            setCurrentImages((prev) => [...prev.slice(1), prev[0]]);
        } else {
            setCurrentImages((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
        }

        setIsTransitioning(false);
        resetProgressAnimation();
        if (autoPlay) initiateAutoSlide();
    };

    const toggleAutoPlay = (enableAuto) => {
        setAutoPlay(enableAuto);
        setActiveMode(enableAuto ? 'auto' : 'manual');
        clearTimeout(autoSlideTimer.current);
        if (enableAuto) {
            initiateAutoSlide();
        }
    };

    return (
        <div className={`carousel ${isTransitioning ? 'transitioning' : ''}`}>
            <div className="list">
                {currentImages.map((item, index) => (
                    <div
                        className="item"
                        key={index}
                        style={{ backgroundImage: `url(${item.url})` }}
                    >
                        <div className="content">
                            <div className="name">{item.name}</div>
                            <div className="des">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="arrows">
                <button className="prev" onClick={() => handleSlide('prev')}>
                    &lt;
                </button>
                <button className="next" onClick={() => handleSlide('next')}>
                    &gt;
                </button>
            </div>

            <div className="controls">
                <button
                    className={activeMode === 'auto' ? 'active' : ''}
                    onClick={() => toggleAutoPlay(true)}
                >
                    Auto Slide
                </button>
                <button
                    className={activeMode === 'manual' ? 'active' : ''}
                    onClick={() => toggleAutoPlay(false)}
                >
                    Manual Slide
                </button>
            </div>

            <div className="progressBar" ref={progressRef}></div>
        </div>
    );
};

export default ImageSlider;
