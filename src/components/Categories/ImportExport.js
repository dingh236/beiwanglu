export const ImportExport = ({ contents, onImport }) => {
  const handleExport = () => {
    const dataStr = JSON.stringify(contents, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    const exportFileDefaultName = `contents-${new Date().toISOString()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const contents = JSON.parse(e.target.result);
        onImport(contents);
      } catch (error) {
        console.error('导入失败:', error);
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExport}
        className="px-4 py-2 text-sm bg-violet-600 text-white rounded-lg"
      >
        导出数据
      </button>
      <label className="px-4 py-2 text-sm bg-violet-600 text-white rounded-lg cursor-pointer">
        导入数据
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}; 