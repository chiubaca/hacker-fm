/**
 * Fetch playlist from audius and create a local copy
 */

import * as fs from "fs";
import axios from "axios";
import { Playlist } from "../types/playlist.interface";

async function generatePlaylist() {
  const resp = await axios.get(
    "https://disc-gru01.audius.hashbeam.com/v1/playlists/nVmr6/tracks?app_name=HACKERFM",
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
          "An error occured while writing JSON Object to File.",
          err
        );
        return err;
      }

      console.log("Playlist has been generated");
    }
  );
}

generatePlaylist();
