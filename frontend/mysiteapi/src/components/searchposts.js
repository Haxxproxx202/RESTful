import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import * as React from "react";

export function searchPosts (posts) {
    const styleCSS = {
        display: "flex",
        float: "left",
        margin: "5px 10px"
    }
    return (
        posts.map((el, id) => {
            return (
                <Box key={id} sx={{minHeight: 350}} style={styleCSS}>
                    <Card
                        variant="outlined"
                        sx={(theme) => ({
                            width: 300,
                            gridColumn: 'span 2',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            resize: 'horizontal',
                            overflow: 'hidden',
                            gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
                            transition: 'transform 0.3s, border 0.3s',
                            '&:hover': {
                                borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                                transform: 'translateY(-2px)',
                            },
                            '& > *': {minWidth: 'clamp(0px, (360px - 100%) * 999,100%)'},
                        })}
                    >

                        <AspectRatio
                            variant="soft"
                            sx={{
                                flexGrow: 1,
                                display: 'contents',
                                '--AspectRatio-paddingBottom':
                                    'clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))',
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
                                loading="lazy"
                                alt=""
                            />
                        </AspectRatio>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                maxWidth: 200,
                            }}
                        >
                            <Box sx={{display: 'flex'}}>
                                <div>
                                    <Typography level="h2" sx={{fontSize: 'md'}} mb={0.5}>
                                        <Link
                                            href={`post/${el.slug}`}
                                            overlay
                                            underline="none"
                                            sx={{
                                                color: 'text.primary',
                                                '&.Mui-focusVisible:after': {outlineOffset: '-4px'},
                                            }}
                                        >
                                            Author: {el.author}
                                        </Link>
                                    </Typography>
                                    <Typography level="body2">{el.title}</Typography>
                                </div>
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="neutral"
                                    sx={{ml: 'auto', alignSelf: 'flex-start'}}
                                >
                                    <FavoriteBorderRoundedIcon color="danger"/>
                                </IconButton>
                            </Box>
                            <AspectRatio
                                variant="soft"
                                sx={{
                                    '--AspectRatio-paddingBottom':
                                        'clamp(0px, (100% - 200px) * 999, 200px)',
                                    pointerEvents: 'none',
                                    position: "relative"
                                }}
                            >
                                <img
                                    alt="not found"
                                    src={el.image}
                                    width="50"
                                    height="50"
                                />
                            </AspectRatio>
                            <Box sx={{display: 'flex', gap: 1.5, mt: 'auto'}}>
                                <div>
                                    <Typography fontWeight="lg" level="body2">
                                        {el.excerpt}
                                    </Typography>
                                </div>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            )
        })
    )
}