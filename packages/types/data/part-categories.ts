/**
 * Part Category (/api/v3/lego/part_categories).
 *
 * @see https://rebrickable.com/api/v3/docs
 */
export interface PartCategory {
  /** The part category ID */
  id: number;

  /** The part category name */
  name: string;

  /** The part category image URL */
  part_count: number;
}
