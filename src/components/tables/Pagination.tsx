import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const renderPageButtons = () => {
    const buttons = [];

    // Show first three pages
    for (let i = 1; i <= 3; i++) {
      if (i <= totalPages) {
        buttons.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            className={currentPage === i ? "bg-primary text-white" : ""}
            size="sm"
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      }
    }

    // Show ellipsis if needed
    if (currentPage > 4) {
      buttons.push(
        <Button key="ellipsis1" variant="outline" size="sm" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    }

    // Show current page and pages around it
    for (let i = Math.max(4, currentPage - 1); i <= Math.min(totalPages - 2, currentPage + 1); i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          className={currentPage === i ? "bg-primary text-white" : ""}
          size="sm"
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 3) {
      buttons.push(
        <Button key="ellipsis2" variant="outline" size="sm" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    }

    // Show last two pages
    for (let i = Math.max(totalPages - 1, 4); i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          className={currentPage === i ? "bg-primary text-white" : ""}
          size="sm"
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="disabled:bg-primary/25 bg-primary text-white"
      >
        Previous
      </Button>
      {renderPageButtons()}
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="disabled:bg-primary/25 bg-primary text-white"
      >
        Next
      </Button>
    </div>
  );
}

export default Pagination;
