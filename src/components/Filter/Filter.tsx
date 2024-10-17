import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";
import { ICategory } from "../../redux/store.types";
import { useSelector } from "react-redux";
import { selectCategories } from "../../redux/categories/selectors";

interface FilterProps {
  selectedCategory: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  setSearchQuery,
  setSelectedCategory,
}) => {
  const categories = useSelector(selectCategories);

  const handleSearchChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    300
  );

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <TextField
        label="Search recipes"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
      />
      <FormControl variant="outlined" fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((category: ICategory) => (
            <MenuItem key={category.strCategory} value={category.strCategory}>
              {category.strCategory}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Filter;
