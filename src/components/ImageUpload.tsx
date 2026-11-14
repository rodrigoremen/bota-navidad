'use client';

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';

interface ImageUploadProps {
	value?: string;
	onChange: (url: string) => void;
	onRemove: () => void;
	shape?: 'circle' | 'square';
	label?: string;
}

export function ImageUpload({
	value,
	onChange,
	onRemove,
	shape = 'circle',
	label = 'foto',
}: ImageUploadProps) {
	const [isUploading, setIsUploading] = useState(false);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleUploadSuccess = (result: any) => {
		if (result.event === 'success') {
			onChange(result.info.secure_url);
			setIsUploading(false);
		}
	};

	const frame = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';

	return (
		<div className="flex flex-col items-center gap-3">
			<div className="relative">
				<div
					className={cn(
						'flex h-28 w-28 items-center justify-center overflow-hidden border-2 border-pine/15 bg-mint',
						frame
					)}
				>
					{value ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img src={value} alt={`Vista previa de ${label}`} className="h-full w-full object-cover" />
					) : (
						<Upload className="h-8 w-8 text-pine/45" strokeWidth={1.6} aria-hidden="true" />
					)}
				</div>

				{value ? (
					<button
						type="button"
						onClick={onRemove}
						aria-label={`Quitar ${label}`}
						className="absolute -right-1.5 -top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-bota text-primary-foreground shadow-md transition-colors hover:bg-bota-deep"
					>
						<X className="h-4 w-4" strokeWidth={2.4} />
					</button>
				) : null}
			</div>

			<CldUploadWidget
				uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'bota-navidad'}
				options={{
					maxFiles: 1,
					resourceType: 'image',
					clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
					maxFileSize: 2000000,
					cropping: shape === 'circle',
					croppingAspectRatio: 1,
					croppingShowDimensions: false,
					folder: 'bota-navidad',
				}}
				onSuccess={handleUploadSuccess}
				onError={() => setIsUploading(false)}
			>
				{({ open }) => (
					<Button
						type="button"
						variant="soft"
						size="sm"
						disabled={isUploading}
						onClick={() => {
							setIsUploading(true);
							open();
						}}
					>
						{isUploading ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Upload className="h-4 w-4" strokeWidth={1.9} />
						)}
						{isUploading ? 'Subiendo…' : value ? 'Cambiar foto' : 'Subir foto'}
					</Button>
				)}
			</CldUploadWidget>
		</div>
	);
}
