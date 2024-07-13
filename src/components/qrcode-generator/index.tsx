import React from 'react';
import QRCode from 'qrcode.react';

interface QRCodeGeneratorProps {
    value: string;
    size: number;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value, size }) => {
    return (
        <QRCode value={value} size={size} className='p-1 bg-white' bgColor="#ffffff" fgColor="#000000" level="Q" />
    );
};

export default QRCodeGenerator;