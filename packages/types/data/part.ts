/**
 * Part (/api/v3/lego/part).
 *
 * @see https://rebrickable.com/api/v3/docs
 */
export interface Part {
  /** The part ID */
  part_num: string;

  /** The part name */
  name: string;

  /** The part category ID */
  part_cat_id: number;

  /** Year from */
  year_from?: number;

  /** Year to */
  year_to?: number;

  /** The part URL */
  part_url: string;

  /** The part image URL */
  part_img_url: string;

  /** Prints */
  prints?: string[];

  /** Molds */
  molds?: string[];

  /** Alternates */
  alternates?: string[];

  /** External IDs */
  external_ids?: Record<string, string>;

  /** Print of */
  print_of: string | null;
}
