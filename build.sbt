import org.scalajs.linker.interface.ModuleSplitStyle

lazy val reactJS                = "16.13.1"
lazy val scalaJsReact           = "1.7.7"
lazy val lucumaCoreVersion      = "0.7.8"
lazy val lucumaUIVersion        = "0.11.5"
lazy val aladinLiteVersion      = "0.2.3"
lazy val reactCommonVersion     = "0.11.3"
lazy val reactGridLayoutVersion = "0.11.0"
lazy val munitVersion           = "0.7.22"
lazy val svgdotjsVersion        = "0.0.4"

inThisBuild(
  Seq(
    homepage := Some(url("https://github.com/gemini-hlsw/react-aladin")),
    Global / onChangedBuildSource := ReloadOnSourceChanges,
    scalacOptions += "-Ymacro-annotations"
  ) 
)

publish / skip := true

lazy val vite =
  project
    .in(file("."))
    .enablePlugins(ScalaJSPlugin)
    .settings(
      name := "vite-scalajs",
      scalaVersion := "2.13.5",
            scalaJSLinkerConfig in (Compile, fastOptJS) ~= { _.withSourceMap(false) },
      scalaJSLinkerConfig in (Compile, fullOptJS) ~= { _.withSourceMap(false) },
      scalaJSLinkerConfig ~= { _.withModuleKind(ModuleKind.ESModule) },
      scalaJSLinkerConfig ~= (_.withModuleSplitStyle(ModuleSplitStyle.SmallestModules)),
      libraryDependencies ++= Seq(
        "com.github.japgolly.scalajs-react" %%% "core"            % scalaJsReact,
        "com.github.japgolly.scalajs-react" %%% "test"            % scalaJsReact % Test,
        "io.github.cquiroz.react"           %%% "common"          % reactCommonVersion,
      ),
    )
