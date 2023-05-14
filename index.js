const core = require("@actions/core");
const github = require("@actions/github");
const fs = require("fs");

const regexAppVersion = /appVersion:(.*)?/;
const regexSemVer =
  /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/;

function readChart(dir) {
  try {
    var chartYamlContent = fs.readFileSync(dir, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    return chartYamlContent;
  } catch (e) {
    console.error(e);
    return;
  }
}

function changeAppVersion(content, dir, version, isSemVer) {
  var updatedChartYamlContent = content.replace(
    regexAppVersion,
    "appVersion: " + version
  );

  fs.writeFile(dir, updatedChartYamlContent, (err) => {
    if (err) {
      console.error(err);
    }
  });

  return chartYamlContent.match(regexAppVersion)[0];
}

try {
  const inputAppVersion = core.getInput("appversion");
  const inputHelmChartDir = core.getInput("helmchartdir");

  var chartYamlContent = readChart(inputHelmChartDir);

  var res = changeAppVersion(
    chartYamlContent,
    inputHelmChartDir,
    inputAppVersion,
    regexSemVer.test(inputAppVersion)
  );

  core.setOutput("result", res);
} catch (error) {
  core.setFailed(error.message);
}
