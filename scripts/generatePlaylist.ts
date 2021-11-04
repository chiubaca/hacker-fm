/**
 * Fetch playlist from audius and create a local copy
 */

import * as fs from "fs";
import axios from "axios";
import { Playlist } from "../types/playlist.interface";

const AUDIUS_ENDPOINT = "https://api.audius.co";
const APP_NAME = "HACKERFM";
const hackerPlaylist = "nVmr6";
const lofiNightsPlaylist = "nqZmb";

async function getAvailableHostUrl() {
  const resp = await axios.get(AUDIUS_ENDPOINT, {
    headers: {
      Accept: "application/json",
    },
  });

  return resp.data.data;
}

async function generatePlaylist(
  hostURL: string,
  playlist: string,
  appName: string
) {
  console.log(`Fetching playlist ${playlist} from ${hostURL}`);

  const resp = await axios.get(
    `${hostURL}/v1/playlists/${playlist}/tracks?app_name=${appName}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  const data = JSON.stringify(resp.data.data) as unknown as Playlist;

  fs.writeFile(
    "./public/playlist.json",
    JSON.stringify(data),
    "utf8",
    (err) => {
      if (err) {
        console.error(
          "An error occurred while writing JSON Object to File.",
          err
        );
        return err;
      }

      console.log("Playlist has been generated");
    }
  );
}

getAvailableHostUrl().then((resp) =>
  generatePlaylist(resp[0], hackerPlaylist, APP_NAME)
);
