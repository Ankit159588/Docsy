import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UploadArea from "../components/UploadArea";
import ToolGrid from "../components/ToolGrid";
import { useEffect, useState } from "react";
import { getAllFiles } from "../database/fileDatabase";

function Home() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFiles() {
      try {
        const files = await getAllFiles();

        setSelectedFiles(files);

        console.log("Restored files:", files);
      } catch (error) {
        console.error("Failed to restore files:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadFiles();
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />

      {isLoading ? (
        <p className="text-center py-12 text-text-main/60">
          Restoring your files
        </p>
      ) : (
        <>
          <UploadArea
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />

          <ToolGrid selectedFiles={selectedFiles} />
        </>
      )}

      <UploadArea
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
      <ToolGrid selectedFiles={selectedFiles} />
    </main>
  );
}

export default Home;
