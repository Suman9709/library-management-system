import { useMutation, useQueryClient } from "@tanstack/react-query";
import { issuingBook } from "../services/booksapi";

export const useIssueBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: issuingBook,

    onSuccess: () => {
      // refetch dashboard data
      queryClient.invalidateQueries({ queryKey: ["allBooks"] });
      queryClient.invalidateQueries({ queryKey: ["issuedBooks"] });
      queryClient.invalidateQueries({ queryKey: ["totalBooks"] });
    },

    onError: (error) => {
      console.error("Issue book failed", error);
    },
  });
};