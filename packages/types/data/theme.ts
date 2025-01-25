/**
 * Part Category (/api/v3/lego/themes/).
 *
 * @see https://rebrickable.com/api/v3/docs
 */
export interface Theme {
  /** The theme ID */
  id: number;

  /** The theme name */
  name: string;

  /** The theme parent ID */
  parent_id: number;
}
