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
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 max-w-md w-full">
				<h3 className="text-lg font-semibold mb-2">{title}</h3>
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
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationDialog;
