/** True on iPhone/iPad/iPod and Mac — covers every Apple platform, since iPadOS
 * can report its UA as "Macintosh" too, and Macs should get Apple Maps either way. */
export function isApplePlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod|Macintosh|Mac OS X/.test(navigator.userAgent);
}
