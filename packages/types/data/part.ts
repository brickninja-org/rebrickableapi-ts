/**
 * Part (/api/v3/lego/part).
 *
 * @see https://rebrickable.com/api/v3/docs
 */
export type Part<T extends number = 0> = T extends 1 ? DetailedPart : BasePart;

export interface DetailedPart extends BasePart {
  /** Year from */
  year_from?: number;

  /** Year to */
  year_to?: number;

  /** Prints */
  prints?: string[];

  /** Molds */
  molds?: string[];

  /** Alternates */
  alternates?: string[];
}

export interface BasePart {
  /** The part ID */
  part_num: string;

  /** The part name */
  name: string;

  /** The part category ID */
  part_cat_id: number;

  /** The part URL */
  part_url: string;

  /** The part image URL */
  part_img_url: string;

  /** External IDs */
  external_ids: Record<'BrickLink' | 'BrickOwl' | 'BrickSet' | 'LDRaw' | 'LEGO', string[]>;

  /** Print of */
  print_of: string | null;
}
