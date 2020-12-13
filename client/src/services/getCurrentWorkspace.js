const getCurrentWorkspace = () => {
  const path = window.location.pathname;
  // console.log(`url is below`);
  // console.log(path);
  const regex = /\/workspace\/([^\/]+)/;
  const result = path.match(regex);
  // console.log(`currworkspace url is below`);
  // console.log(result);
  const currWorkspace = result[1];
  return currWorkspace;
};

export { getCurrentWorkspace };
