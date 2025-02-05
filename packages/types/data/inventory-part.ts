import type { Color } from "./color";
import type { Part } from "./part";

/**
 * Part (/api/v3/lego/part).
 *
 * @see https://rebrickable.com/api/v3/docs
 */
export interface InventoryPart {
  /** The Inventory ID */
  id: number;

  /** The Inventory Part ID */
  inv_part_id: number;

  /** The Part */
  part: Part;

  /** The Color */
  color: Color;

  /** The Set Number */
  set_num: string;

  /** The Quantity */
  quantity: number;

  /** The Is Spare */
  is_spare: boolean;

  /** The Element ID */
  element_id: string;

  /** The Number of Sets */
  num_sets: number;
}
