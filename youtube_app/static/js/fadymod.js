export class Fady {
  constructor() {}
  insertYear(span) {
    let y = new Date().getFullYear();
    span.textContent = y;
  }
  isValidYtUrl(url) {
    let youtubeUrlRegex =
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_\-]{11})$/;
    return youtubeUrlRegex.test(url);
  }
}

export class Youtube {
  constructor(url) {
    let f = new Fady();
    this.u = url;
    if (f.isValidYtUrl(this.u) === false) {
      console.log("Invalid youtube link");
    }
  }

  /**
   *
   * @example
   * const yt = new Youtube(url)
   * // getting info of video
   * const data = await yt.info()
   * console.log(data)
   * @returns Promise with Object Just put (await) before obj.info()
   */
  async info() {
    // let title, authorName, thumbnailUrl;
    let apiUrl =
      "https://www.youtube.com/oembed?url=" +
      encodeURIComponent(this.u) +
      "&format=json";
    try {
      let data = await (await fetch(apiUrl)).json();
      delete data.width;
      delete data.version;
      delete data.height;
      delete data.provider_name;
      delete data.provider_url;
      return data;
    } catch (reason) {
      console.log(reason);
    }
  }

  async insert_info(elementsArr = []) {
    let data = await this.info();

    for (let i = 0; i < elementsArr.length; i++) {
      const element = elementsArr[i];
      const key = Object.keys(data)[i];
      element.textContent = data[key];
    }
  }
}
