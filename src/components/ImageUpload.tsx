'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploadProps {
	value?: string;
	onChange: (url: string) => void;
	onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleUploadSuccess = (result: any) => {
		if (result.event === 'success') {
			const url = result.info.secure_url;
			onChange(url);
			setIsUploading(false);
		}
	};

	return (
		<div className="space-y-4">
			{value ? (
				<div className="relative mx-auto w-fit">
					<div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto border-4 border-white/20 shadow-xl">
						<Image
							src={value}
							alt="Profile picture"
							fill
							className="object-cover"
						/>
					</div>
					<button
						onClick={() => {
							onRemove();
						}}
						className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors z-10 shadow-lg"
						type="button"
					>
						<X className="h-5 w-5" />
					</button>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center space-y-2">
					<div className="w-48 h-48 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center">
						<Upload className="h-12 w-12 text-gray-400" />
					</div>
				</div>
			)}
			
			<CldUploadWidget
				uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'bota-navidad'}
				options={{
					maxFiles: 1,
					resourceType: 'image',
					clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
					maxFileSize: 2000000, // 2MB
					cropping: true,
					croppingAspectRatio: 1,
					croppingShowDimensions: true,
					folder: 'bota-navidad',
				}}
				onSuccess={handleUploadSuccess}
				onError={() => {
					console.error('❌ Upload error');
					setIsUploading(false);
				}}
			>
				{({ open }) => (
					<div className="flex justify-center">
						<Button
							type="button"
							onClick={() => {
								console.log('🖱️ Click en botón subir foto');
								setIsUploading(true);
								open();
							}}
							variant="outline"
							size="sm"
							disabled={isUploading}
							className="border-purple-500/50 hover:bg-purple-500/20 text-purple-300"
						>
							<Upload className="h-4 w-4 mr-2" />
							{isUploading ? 'Subiendo...' : value ? 'Cambiar foto' : 'Subir foto'}
						</Button>
					</div>
				)}
			</CldUploadWidget>
		</div>
	);
}
