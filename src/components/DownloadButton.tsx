import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  content: string;
  filename: string;
  title?: string;
}

export const DownloadButton = ({ content, filename, title = "Download" }: DownloadButtonProps) => {
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!content || content.trim().length === 0) {
    return null;
  }

  return (
    <Button 
      onClick={handleDownload}
      variant="outline"
      size="sm"
      className="w-full"
    >
      <Download className="w-4 h-4 mr-2" />
      {title}
    </Button>
  );
};