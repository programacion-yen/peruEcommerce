import React from 'react';
import Image from 'next/image';

const FooterCopyright = () => (
    <div className="ps-footer__copyright">
        {/* <p>&copy;  2021 Martfury. All Rights Reserved</p> */}
        <p>
            <span>Andes Industrial</span>
            <a>
                <img src="https://www.andesindustrial.cl/images/payment.png" alt="Martfury" width="200" height="50"/>
            </a>
        </p>
    </div>
);

export default FooterCopyright;
