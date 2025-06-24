// components/DeleteButton.tsx
import { useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog ";
import { AuthService } from "../services/authService";

interface DeleteButtonProps {
	studentId: number;
	studentName: string;
	onDeleted?: () => void;
}

const DeleteButton = ({
	studentId,
	studentName,
	onDeleted,
}: DeleteButtonProps) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async () => {
		setIsDeleting(true);
		setError(null);

		try {
			await AuthService.deleteStudent(studentId);
			setIsDialogOpen(false);
			if (onDeleted) onDeleted();
		} catch (err) {
			console.error("Delete error:", err);
			setError(err instanceof Error ? err.message : "Failed to delete student");
		} finally {
			setIsDeleting(false);
			window.location.reload();
		}
	};

	return (
		<>
			<button
				onClick={() => setIsDialogOpen(true)}
				className="border bg-white hover:bg-red-100 border-red-300 text-red-500 font-medium py-[6px] px-4 rounded"
				title="Delete student"
			>
				Delete
			</button>

			<ConfirmationDialog
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onConfirm={handleDelete}
				title="Confirm Deletion"
				message={`Are you sure you want to delete ${studentName} ? This action cannot be undone.`}
				confirmText={isDeleting ? "Deleting..." : "Delete"}
			/>

			{error && <div className="mt-2 text-sm text-red-600">{error}</div>}
		</>
	);
};

export default DeleteButton;
