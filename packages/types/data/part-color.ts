/**
 * Part Category (/api/v3/lego/parts/{part_num}/colors/).
 *
 * @see https://rebrickable.com/api/v3/docs
 */
export interface PartColor {
  /** The part color ID */
	color_id: number;

  /** The part color name */
	color_name: string;

  /** Number of sets that use this part/color combination */
	num_sets: number;

  /** Number of parts in sets that use this part/color combination */
	num_set_parts: number;

  /** The part image URL */
	part_img_url: string;

  /** Elements IDs for this part/color combination */
	elements: string[];
}
