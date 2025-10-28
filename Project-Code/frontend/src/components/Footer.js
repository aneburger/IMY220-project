/* Ane' Burger 24565068, 33 */

import React from "react";
import '../../public/assets/style/css/footer.css';

const Footer = () => {
    const setTheme = (mode) => {
        document.documentElement.setAttribute('data-theme', mode);
        try { localStorage.setItem('theme', mode); } catch (_) {}
    };

    return (
        <footer id="footer">
            <div id="brands">
                    
            </div>
            <div>
                <p id="ftext">&copy; 2025 Commited. | 2025 | All rights reserved. </p>
                <img id="light-mode" alt="light-mode" src="/assets/images/light-mode.png" width="40"
                        role="button"
                        tabIndex={0}
                        onClick={() => setTheme('light')}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setTheme('light')}/>
                <img id="dark-mode" alt="dark-mode" src="/assets/images/dark-mode.png" width="40"
                        role="button"
                        tabIndex={0}
                        onClick={() => setTheme('dark')}
                        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setTheme('dark')}/>
            </div>
        </footer>
    );
}

export default Footer;