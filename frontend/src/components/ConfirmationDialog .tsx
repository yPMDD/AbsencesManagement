// components/ConfirmationDialog.tsx

interface ConfirmationDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
}

const ConfirmationDialog = ({
	isOpen,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = "Delete",
	cancelText = "Cancel",
}: ConfirmationDialogProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="w-full max-w-md p-6 bg-white rounded-lg">
				<h3 className="mb-2 text-lg font-semibold">{title}</h3>
				<p className="mb-6">{message}</p>
				<div className="flex justify-end space-x-3">
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
					>
						{cancelText}
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationDialog;
