const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

const regexAppVersion = /appVersion:(.*)?/;
const regexSemVer =
  /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/;

function verifySemVer(version) {
  if (!regexSemVer.test(version)) {
    throw new Error("semantic version is invalid");
  }
  return version;
}

function readChart(dir) {
  try {
    var chartYamlContent = fs.readFileSync(dir, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  } catch (e) {
    console.error(e);
    return chartYamlContent;
  }
}

function changeAppVersion(dir, semVersion, isSemVer) {

  var updatedChartYamlContent = chartYamlContent.replace(
    regexAppVersion,
    "appVersion: " + semVersion
  );

  

  fs.writeFile(dir, updatedChartYamlContent, (err) => {
    if (err) {
      console.error(err);
    }
  });

  return chartYamlContent.match(regexAppVersion)[0];
}

try {
  const inputAppVersion = core.getInput('appVersion');

  if (isSemVer) {
    verifySemVer(semVersion);
  }

  var res = changeAppVersion("test/charts/awesome/Chart.yaml", inputAppVersion, false);
  core.setOutput("result", res);
} catch (error) {
  core.setFailed(error.message);
}
