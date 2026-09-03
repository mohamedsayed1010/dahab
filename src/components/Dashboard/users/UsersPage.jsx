import { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useUsersHook from "./useUsersHook";

export default function UsersPage() {
  const { users, count, isLoading } = useUsersHook();
  const [search, setSearch] = useState("");

  const isMobile = useMediaQuery("(max-width:768px)");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.phone?.includes(search),
    );
  }, [users, search]);

  const rows = filteredUsers.map((user, index) => ({
    id: user._id,
    serial: index + 1,
    name: user.name,
    phone: user.phone,
    createdAt: new Date(user.createdAt).toLocaleDateString("en-GB"),
  }));

  const copyPhones = async () => {
    try {
      const phones = users
        .map((user) => user.phone?.trim())
        .filter(Boolean);

      await navigator.clipboard.writeText(phones.join("\n"));

      alert(`Copied ${phones.length} phone numbers`);
    } catch (error) {
      console.error(error);
      alert("Failed to copy phone numbers");
    }
  };

  const columns = [
    {
      field: "serial",
      headerName: "#",
      width: 60,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 120,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "copy",
      headerName: "Copy",
      width: 90,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <button
          onClick={() => navigator.clipboard.writeText(params.row.phone)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <ContentCopyIcon fontSize="small" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-3 md:p-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
            Users
          </h1>

          <p className="text-gray-500 mt-1 dark:text-white">
            Total Users: {count}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <TextField
            size="small"
            fullWidth={isMobile}
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: {
                xs: "100%",
                md: 300,
              },

              // ===== INPUT TEXT =====
              "& .MuiInputBase-input": {
                color: "#000", // light mode
              },

              // ===== OUTLINE BASE =====
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent",

                "& fieldset": {
                  borderColor: "rgba(0,0,0,0.23)",
                },

                "&:hover fieldset": {
                  borderColor: "rgba(0,0,0,0.5)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },

              // ===== DARK MODE OVERRIDE =====
              ".dark & .MuiInputBase-input": {
                color: "#fff", // 👈 ده أهم حاجة عشان الكلام يبان
              },

              ".dark & .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.3)",
                },

                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.6)",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <button
            onClick={copyPhones}
            className="px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition whitespace-nowrap"
          >
            Copy All Phones
          </button>
        </div>
      </div>

      <div
        className="bg-card rounded-2xl md:rounded-3xl border border-border overflow-x-auto"
        style={{ height: 650 }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          loading={isLoading}
          disableRowSelectionOnClick
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{
            border: 0,
            minWidth: isMobile ? 750 : "100%",

            "& .MuiDataGrid-columnHeaders": {
              fontWeight: 700,
            },

            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
            },
          }}
        />
      </div>
    </div>
  );
}
