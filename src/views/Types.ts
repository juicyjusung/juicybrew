export interface Formulae {
  aliases: [];
  bottle: object;
  bottle_disabled: boolean;
  build_dependencies: [];
  caveats: object | null;
  conflicts_with: [];
  dependencies: [];
  desc: string;
  full_name: string;
  homepage: string;
  installed: [];
  keg_only: boolean;
  linked_keg: null;
  name: string;
  oldname: string | null;
  optional_dependencies: [];
  options: [];
  outdated: boolean;
  pinned: boolean;
  recommended_dependencies: [];
  requirements: [];
  revision: number;
  urls: object;
  uses_from_macos: [];
  version_scheme: number;
  versioned_formulae: [];
  versions: {
    bottle: boolean;
    devel: any;
    head: any;
    stable: string;
  };
  isSelected: boolean;
}
