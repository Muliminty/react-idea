import { useState, useEffect, useRef } from 'react';
import 'animate.css'; // 引入 animate.css 样式
import { VariableSizeList as List } from 'react-window'; // 使用 react-window 虚拟化列表
import './ComplexList.scss'; // 引入自定义的样式

// mockData.js
const mockGetPosts = (count = 30) => {
    return new Array(count).fill(null).map((_, index) => ({
        id: index + 1,
        content: `Post ${index + 1}`,
    }));
};

const ComplexList = () => {
    const [posts, setPosts] = useState(mockGetPosts(100)); // 使用 state 存储 posts


    // 渲染列表项时触发动画
    const renderRow = ({ index, style }) => {
        const itemRef = useRef(null);

        // 观察器回调
        const onIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__fadeInUp'); // 进入视口时触发动画
                    entry.target.classList.add('animate__animated'); // 添加动画类
                }
            });
        };

        // 在组件挂载时初始化 IntersectionObserver
        useEffect(() => {
            const currentRef = itemRef.current;

            // 仅当 itemRef.current 不为 null 时才初始化 IntersectionObserver
            if (currentRef) {
                const observer = new IntersectionObserver(onIntersection, {
                    rootMargin: '0px', // 设置视口与元素的距离，0px 表示元素出现在视口内即可触发
                    threshold: 0.1, // 元素至少有10%可见时触发
                });

                observer.observe(currentRef); // 开始观察当前项

                // 清理函数：在组件卸载时解除观察
                return () => {
                    if (currentRef) {
                        observer.unobserve(currentRef); // 解除观察
                    }
                };
            }
            console.log('currentRef is null', index);
        }, [index]); // 每次 `index` 更新时重新设置观察器

        return (
            <>

                <div
                    ref={itemRef} // 绑定 ref 到该列表项
                    style={{
                        ...style,
                        top: style.top

                    }} // 必须传递 style 来正确渲染 react-window 列表项
                    className="post wow" // 使用 WOW.js 类（如果需要）
                    data-wow-duration="1s"
                    data-wow-delay={`${index * 0.5}s`}
                >

                    <div className="post-content">
                        <div
                            data-wow-duration="1s"
                            data-wow-delay={`${index * 0.5}s`}
                            className='wow animate__fadeInRight'
                        >
                            {posts[index].id}
                        </div>
                        {posts[index].content}
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="post-list">
            <List
                height={500} // 设置列表的高度
                itemCount={posts.length}
                itemSize={() => 100} // 使用动态高度的函数
            // width={300} // 设置列表宽度
            >
                {renderRow}
            </List>
        </div>
    );
};

export default ComplexList;
