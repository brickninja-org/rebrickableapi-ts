import type { Color } from "./color";
import type { Part } from "./part";

/**
 * Element as returned from `/api/v3/lego/elements/${element_id}/`
 *
 * @see https://rebrickable.com/api/v3/docs
 */
export interface Element {
  /** The element part */
  part: Part;

  /** The element color */
  color: Color;

  /** The element ID */
  element_id: string;

  /** The design ID */
  design_id: string;

  /** The element image URL */
  element_img_url: string;

  /** The element image URL */
  part_img_url: string;
}
